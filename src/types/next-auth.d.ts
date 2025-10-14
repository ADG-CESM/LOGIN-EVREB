import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      username?: string;
      nombre?: string;
      apellido?: string;
      plantel?: string;
      semestre?: string;
      rol?: string;
      // keep default fields
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    username?: string;
    nombre?: string;
    apellido?: string;
    plantel?: string;
    semestre?: string;
    rol?: string;
  }

  interface JWT {
    id?: string;
    username?: string;
    nombre?: string;
    apellido?: string;
    plantel?: string;
    semestre?: string;
    rol?: string;
  }
}
