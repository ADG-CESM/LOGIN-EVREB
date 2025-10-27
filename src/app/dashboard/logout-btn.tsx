"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    const handleSignOut = async () => {
        // Use the current origin so the callback URL uses the same host (works in dev and production)
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const callbackUrl = `${origin}/evreb/login`;

        // Ask next-auth to sign out but don't let it redirect; then force the client redirect to the desired origin.
        // This lets us avoid cases where the server (NEXTAUTH_URL) forces a localhost redirect.
        try {
            await signOut({ callbackUrl, redirect: false });
        } finally {
            // Always navigate the client to the intended callback (ensures redirect even if server responded with localhost)
            if (typeof window !== "undefined") window.location.href = callbackUrl;
        }
    };

    return <button onClick={handleSignOut}>Cerrar sesión</button>;
}
