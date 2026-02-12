"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
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
                {/* Sesión eliminada: acceso público para todos */}
            </div>
        </header>
    );
}
