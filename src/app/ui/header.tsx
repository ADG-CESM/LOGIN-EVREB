"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="app-header">
            <div className="header-left">
                <Link href="/">
                    <Image
                        className="header-logo"
                        src="/evreb/0logo-dgtic1.png"
                        alt="DGTIC"
                        width={160}
                        height={48}
                        priority
                    />
                </Link>
            </div>
            <div className="header-right">
                {session?.user ? (
                    <>
                        <span className="user-name">
                            {session.user.nombre ?? session.user.username}{" "}{session.user.apellido}
                        </span>
                        <button
                            className="btn btn-light"
                            onClick={() => signOut({ callbackUrl: "/evreb/login" })}
                        >
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <Link className="btn btn-light" href="/login">Iniciar sesión</Link>
                )}
            </div>
        </header>
    );
}
