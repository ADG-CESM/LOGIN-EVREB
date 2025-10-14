// src/auth.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";
// PostgresAdapter removed to avoid unsafe any casts; keep pool for DB queries
import { getServerSession } from "next-auth";

// Minimal app user shape returned from DB
type AppUser = {
  id: string;
  username?: string;
  nombre?: string;
  apellido?: string;
  plantel?: string;
  semestre?: string;
  rol?: string;
};

// SessionCallbackParam removed; use NextAuth types inferred from NextAuthOptions

export const authOptions: NextAuthOptions = {
  // Use JWT strategy so Credentials provider sign-in works correctly
  session: { strategy: "jwt" },
  // adapter omitted to avoid explicit any casts; configure adapter if desired
  pages: { signIn: "/login" },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.username || !creds.password) return null;

        // Busca usuario por username
        const { rows } = await pool.query(
          `SELECT id, username, password FROM users WHERE username = $1`,
          [creds.username]
        );
        const user = rows[0];
        if (!user) return null;

        // Verifica contraseña
        const ok = await bcrypt.compare(creds.password, user.password);
        if (!ok) return null;

        // IMPORTANTE: con strategy "database", Auth.js espera que el usuario exista en "users".
        // Ya existe (lo creamos en /api/register). Devuelve al menos { id }.
        return { id: String(user.id) };
      },
    }),
  ],

  callbacks: {
    // Persist user id into JWT on sign in
    async jwt({ token, user }) {
      if (user) {
        // credential authorize returns { id }
        const uid = (user as unknown as { id?: string })?.id;
        if (uid) return { ...token, id: uid };
      }
      return token;
    },
    // Como no usamos JWT, aquí le agregamos tus campos a la sesión LEYENDO DB.
    async session({ session, token }) {
      // session.user.id proviene del token cuando usamos JWT
  const uid = (token as unknown as { id?: string })?.id ?? (session as unknown as { user?: { id?: string } })?.user?.id;
      if (!uid) return session;

      // Lee tus campos y colócalos en session.user
      const { rows } = await pool.query(
        `SELECT username, nombre, apellido, plantel, semestre, rol
         FROM users WHERE id = $1`,
        [uid]
      );
      const u = rows[0];
      if (u) {
        const au: AppUser = {
          id: uid,
          username: u.username,
          nombre: u.nombre,
          apellido: u.apellido,
          plantel: u.plantel,
          semestre: u.semestre,
          rol: u.rol,
        };
  (session as unknown as { user?: AppUser }).user = au;
      }
      return session;
    },
  },
};

// Export a handler for the App Router API route to call.
// NextAuth(authOptions) returns a request handler that can be used directly by the App Router.
export const handler = NextAuth(authOptions);

// Server helper to get the session from server components
export async function auth() {
  return await getServerSession(authOptions);
}
