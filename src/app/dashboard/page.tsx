// src/app/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();
    const sess = session as unknown;
    const sessObj = (sess && typeof sess === "object") ? (sess as Record<string, unknown>) : undefined;
    const user = (sessObj ? (sessObj["user"] as unknown) : undefined) as {
        id?: string;
        username?: string;
        nombre?: string;
        apellido?: string;
        plantel?: string;
        semestre?: number;
        rol?: string;
    } | undefined;
    if (!user) redirect("/login");

    return (
        <main style={{ padding: 24 }}>
            <h1>Hola, {user.nombre} {user.apellido}</h1>
            <ul>
                <li>Usuario: {user.username}</li>
                <li>Plantel: {user.plantel}</li>
                <li>Semestre: {user.semestre}</li>
                <li>Rol: {user.rol}</li>
            </ul>
        </main>
    );
}
