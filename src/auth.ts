import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";

interface UserType {
  id: string;
  username: string;
  nombre: string;
  apellido: string;
  plantel: string;
  semestre: string;
  rol: string;
}

export const authOptions: NextAuthOptions = {
  // With basePath set in next.config.ts and SessionProvider basePath, we don't need it here for v4
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",  // use relative path; Next.js will prepend basePath
    error: "/login",   // redirect errors back to login to show message
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(creds) {
        if (!creds?.username || !creds.password) return null;

        const { rows } = await pool.query(
          `SELECT id, username, password, nombre, apellido, plantel, semestre, rol
           FROM users
           WHERE username = $1`,
          [creds.username]
        );

        const user = rows[0];
        if (user && await bcrypt.compare(creds.password, user.password)) {
          // Return only the allowed fields (omit password)
          const safeUser: UserType = {
            id: String(user.id),
            username: user.username,
            nombre: user.nombre,
            apellido: user.apellido,
            plantel: user.plantel,
            semestre: user.semestre,
            rol: user.rol,
          };
          return safeUser;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Fields are added via module augmentation in types/next-auth.d.ts
        token.id = (user as import("next-auth").User).id;
        token.username = (user as import("next-auth").User).username;
        token.nombre = (user as import("next-auth").User).nombre;
        token.apellido = (user as import("next-auth").User).apellido;
        token.plantel = (user as import("next-auth").User).plantel;
        token.semestre = (user as import("next-auth").User).semestre;
        token.rol = (user as import("next-auth").User).rol;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        username: token.username,
        nombre: token.nombre,
        apellido: token.apellido,
        plantel: token.plantel,
        semestre: token.semestre,
        rol: token.rol,
      };
      return session;
    }
  }
};
