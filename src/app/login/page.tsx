// src/app/login/page.tsx
"use client";
import { signIn, type SignInResponse } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Request sign-in without automatic redirect so we can show friendly errors
        const res = (await signIn("credentials", {
            username,
            password,
            redirect: false,
        })) as SignInResponse | undefined;

        setLoading(false);

        // If NextAuth returns an error, show a friendly message
        if (res && res.error) {
            setError("Usuario o contraseña incorrectos. Revisa tus datos y vuelve a intentar.");
            return;
        }

        // Successful sign-in: navigate to dashboard
        router.push("/dashboard");
    }

    return (
        <main className="page-container">
            <div className="card form-card">
                <h1 className="form-title text-2xl">Iniciar sesión</h1>

                <form onSubmit={onSubmit} className="form-grid" aria-label="Formulario de inicio de sesión">
                    <label className="field">
                        <span className="label-text">Usuario</span>
                        <input className="input" placeholder="No. de cuenta" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>

                    <label className="field">
                        <span className="label-text">Contraseña</span>
                        <input className="input" type="password" placeholder="Tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>

                    <button className="btn" type="submit" disabled={loading}>{loading ? 'Ingresando…' : 'Entrar'}</button>
                    {error ? <div className="error" role="alert">{error}</div> : null}
                </form>

                <p className="muted">¿No tienes cuenta? <a href="/register">Regístrate</a></p>
            </div>
        </main>
    );
}
