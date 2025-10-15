import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-btn";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
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
            <LogoutButton />
        </main>
    );
}
