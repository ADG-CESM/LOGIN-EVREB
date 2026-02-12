"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    const handleSignOut = async () => {

        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const callbackUrl = `${origin}/evreb/login`;


        try {
            await signOut({ callbackUrl, redirect: false });
        } finally {

            if (typeof window !== "undefined") window.location.href = callbackUrl;
        }
    };

    return <button onClick={handleSignOut}>Cerrar sesión</button>;
}
