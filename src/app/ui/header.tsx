"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header style={{ display: "flex", gap: 16, padding: 12, borderBottom: "1px solid #eee" }}>
            <Link href="/">Inicio</Link>
            <Link href="/dashboard">Dashboard</Link>

            <div style={{ marginLeft: "auto" }}>
                {session?.user ? (
                    <>
                        <span style={{ marginRight: 12 }}>
                            {session.user.username} ({session.user.rol})
                        </span>
                        <button onClick={() => signOut({ callbackUrl: "/evreb/login" })}>
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <Link href="/login">Iniciar sesión</Link>
                )}
            </div>
        </header>
    );
}
