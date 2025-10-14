// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { username, password, nombre, apellido, plantel, semestre, rol } = await req.json();

    if (!username || !password || !nombre || !apellido || !plantel || !semestre || !rol) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }
    const sem = Number(semestre);
    if (!Number.isInteger(sem) || sem < 1 || sem > 12) {
      return NextResponse.json({ error: "Semestre inválido (1-12)" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (username, password, nombre, apellido, plantel, semestre, rol)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [username, hashed, nombre, apellido, plantel, sem, rol]
    );

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    // Extraer info segura del error
    const getErr = (e: unknown) => {
      if (e && typeof e === "object") {
        const obj = e as Record<string, unknown>;
        const code = typeof obj.code === "string" ? obj.code : undefined;
        const message = typeof obj.message === "string" ? obj.message : undefined;
        return { code, message };
      }
      return { code: undefined, message: String(e) };
    };
    const e = getErr(err);
    if (e.code === "23505") {
      return NextResponse.json({ error: "Usuario ya existe" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Error en registro" }, { status: 500 });
  }
}
