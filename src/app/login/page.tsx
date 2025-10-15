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
    const [infoMsg, setInfoMsg] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    // If NextAuth redirected here with ?error=CredentialsSignin, show a friendly message
    const errorFromQuery = useMemo(() => searchParams.get("error"), [searchParams]);
    const registeredFlag = useMemo(() => searchParams.get("registered"), [searchParams]);
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
    useEffect(() => {
        if (registeredFlag === "1") {
            setInfoMsg("Registro exitoso. Ahora ingresa tus credenciales.");
        }
    }, [registeredFlag]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg(null);
        setSubmitting(true);
        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (res?.error) {
                setErrorMsg("Usuario o contraseña incorrectos.");
                return;
            }

            // Navegar al dashboard (Next añade basePath automáticamente)
            router.push("/dashboard");
        } catch {
            setErrorMsg("No se pudo iniciar sesión. Inténtalo de nuevo.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="page-container">
            <div className="card form-card">
                <h1 className="form-title text-2xl">Iniciar sesión</h1>
                <form onSubmit={onSubmit} className="form-grid">
                    {infoMsg && <div className="muted">{infoMsg}</div>}
                    {errorMsg && <div className="error">{errorMsg}</div>}
                    <div className="field">
                        <label className="label-text">Usuario</label>
                        <input
                            className="input"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                            autoFocus
                            inputMode="text"
                        />
                    </div>
                    <div className="field">
                        <label className="label-text">Contraseña</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            inputMode="text"
                        />
                    </div>
                    <button className="btn" type="submit" disabled={submitting}>
                        {submitting ? "Ingresando…" : "Entrar"}
                    </button>
                </form>
                <p className="muted">¿No tienes cuenta? <Link href="/register">Regístrate</Link></p>
            </div>
        </main>
    );
}
