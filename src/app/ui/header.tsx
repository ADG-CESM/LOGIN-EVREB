// src/app/ui/header.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
    const { data: session } = useSession();
    // NextAuth typically sets user.name to the display/full name.
    // Our session callback sets user.nombre and user.apellido on session.user
    const user = session?.user as { nombre?: string; apellido?: string; name?: string; email?: string } | undefined;

    const router = useRouter();

    function onAuthClick() {
        if (session?.user) {
            void signOut({ callbackUrl: "/login" });
        } else {
            router.push("/login");
        }
    }

    const fullName = (user?.nombre || user?.name)
        ? `${user?.nombre ?? user?.name}${user?.apellido ? " " + user?.apellido : ""}`
        : (user?.email ?? "");

    return (
        <header className="app-header">
            <Link href="/" className="brand header-left">
                <span className="header-title">CCH — Portal</span>
            </Link>

            <div className="header-right">
                <span className="user-name">{fullName}</span>
                <button className="btn" onClick={onAuthClick} aria-label={session?.user ? "Cerrar sesión" : "Iniciar sesión"}>
                    {session?.user ? "Cerrar sesión" : "Iniciar sesión"}
                </button>
            </div>
        </header>
    );
}
