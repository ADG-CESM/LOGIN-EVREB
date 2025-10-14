// src/app/api/auth/[...nextauth]/route.ts
export const runtime = "nodejs"; // necesario para 'pg'

// Minimal, recommended App Router pattern: re-export NextAuth handler as GET/POST
export { handler as GET, handler as POST } from "@/auth";
