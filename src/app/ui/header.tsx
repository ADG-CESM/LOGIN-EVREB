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
                            onClick={async () => {
                                const origin = typeof window !== "undefined" ? window.location.origin : "";
                                const callbackUrl = `${origin}/evreb/login`;
                                try {
                                    await signOut({ callbackUrl, redirect: false });
                                } finally {
                                    if (typeof window !== "undefined") window.location.href = callbackUrl;
                                }
                            }}
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
