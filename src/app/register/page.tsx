// src/app/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        nombre: "",
        apellido: "",
        plantel: "",
        semestre: "",
        rol: "alumno",
    });
    const router = useRouter();

    function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
        setForm((s) => ({ ...s, [k]: v }));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, semestre: Number(form.semestre) }),
        });
        if (res.ok) {
            alert("Registro exitoso. Inicia sesión.");
            router.push("/login");
        } else {
            const data = await res.json().catch(() => ({}));
            alert(data?.error ?? "Error en registro");
        }
    }

    return (
        <main className="page-container">
            <div className="card form-card">
                <h1 className="form-title">Registro de alumno</h1>

                <form onSubmit={onSubmit} className="form-grid" aria-label="Formulario de registro">
                    <label className="field">
                        <span className="label-text">Nombre</span>
                        <input className="input" placeholder="Ej. Juan" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required />
                    </label>

                    <label className="field">
                        <span className="label-text">Apellido</span>
                        <input className="input" placeholder="Ej. Pérez" value={form.apellido} onChange={(e) => set("apellido", e.target.value)} required />
                    </label>

                    <label className="field">
                        <span className="label-text">Correo o usuario</span>
                        <input className="input" placeholder="usuario o correo" value={form.username} onChange={(e) => set("username", e.target.value)} required />
                    </label>

                    <label className="field">
                        <span className="label-text">Contraseña</span>
                        <input className="input" type="password" placeholder="Crea una contraseña segura" value={form.password} onChange={(e) => set("password", e.target.value)} required />
                    </label>

                    <label className="field">
                        <span className="label-text">Plantel</span>
                        <input className="input" placeholder="Ej. Plantel UNAM" value={form.plantel} onChange={(e) => set("plantel", e.target.value)} required />
                    </label>

                    <label className="field">
                        <span className="label-text">Semestre</span>
                        <input className="input" type="number" min={1} max={12} placeholder="1" value={form.semestre} onChange={(e) => set("semestre", e.target.value)} required />
                    </label>

                    <label className="field">
                        <span className="label-text">Rol</span>
                        <select className="input" value={form.rol} onChange={(e) => set("rol", e.target.value as typeof form.rol)}>
                            <option value="alumno">Alumno</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>

                    <button className="btn" type="submit">Crear cuenta</button>
                </form>
            </div>
        </main>
    );
}
