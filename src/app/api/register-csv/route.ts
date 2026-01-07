import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";

interface UserInput {
    username: string;
    password?: string;
    nombre: string;
    apellido: string;
    plantel: string;
    semestre: string | number;
    rol: string;
}

export async function POST(req: Request) {
    try {
        const { users } = await req.json();

        if (!Array.isArray(users) || users.length === 0) {
            return NextResponse.json({ error: "No se enviaron usuarios" }, { status: 400 });
        }

        const results = [];

        // Process sequentially to keep it simple and tracking errors per row easily
        for (const user of users) {
            try {
                const { username, password, nombre, apellido, plantel, semestre, rol } = user as UserInput;

                // Skip rows with missing essential data
                if (!username || !nombre || !plantel || !semestre || !rol) {
                    results.push({ username, status: "error", message: "Faltan campos obligatorios" });
                    continue;
                }

                // Use provided password or default to "1234" if missing
                const rawPassword = password ? String(password) : "1234";
                const hashed = await bcrypt.hash(rawPassword, 10);
                const sem = Number(semestre);

                if (!Number.isInteger(sem)) {
                    results.push({ username, status: "error", message: "Semestre inválido" });
                    continue;
                }

                await pool.query(
                    `INSERT INTO users (username, password, nombre, apellido, plantel, semestre, rol)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                    [username, hashed, nombre, apellido, plantel, sem, rol]
                );

                results.push({ username, status: "success" });
            } catch (e: any) {
                if (e.code === "23505") {
                    results.push({ username: user.username, status: "error", message: "Usuario ya existe" });
                } else {
                    console.error(e);
                    results.push({ username: user.username, status: "error", message: "Error interno" });
                }
            }
        }

        return NextResponse.json({ ok: true, results });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Error procesando petición" }, { status: 500 });
    }
}
