"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    // If NextAuth redirected here with ?error=CredentialsSignin, show a friendly message
    const errorFromQuery = useMemo(() => searchParams.get("error"), [searchParams]);
    useEffect(() => {
        if (!errorFromQuery) return;
        // Map known NextAuth error codes to Spanish messages
        const map: Record<string, string> = {
            CredentialsSignin: "Usuario o contraseña incorrectos.",
            AccessDenied: "Acceso denegado.",
            Default: "Ocurrió un error al iniciar sesión.",
        };
        setErrorMsg(map[errorFromQuery] ?? map.Default);
    }, [errorFromQuery]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg(null);
        setSubmitting(true);
        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
                // We’ll navigate manually on success
            });

            if (res?.error) {
                // NextAuth returns 'CredentialsSignin' for bad credentials
                setErrorMsg("Usuario o contraseña incorrectos.");
                return;
            }

            // On success, NextAuth may return a URL; prefer it if present
            if (res?.url) {
                // Ensure we respect basePath in the returned URL
                router.push(res.url);
            } else {
                router.push("/evreb/dashboard");
            }
        } catch {
            setErrorMsg("No se pudo iniciar sesión. Inténtalo de nuevo.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main style={{ padding: 24 }}>
            <h1>Iniciar sesión</h1>
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 320 }}>
                {errorMsg && (
                    <div style={{ color: "#b91c1c", background: "#fee2e2", padding: 8, borderRadius: 6 }}>
                        {errorMsg}
                    </div>
                )}
                <input placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={submitting}>
                    {submitting ? "Ingresando…" : "Entrar"}
                </button>
            </form>
            <p style={{ marginTop: 12 }}>
                ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
            </p>
        </main>
    );
}
