"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        nombre: "",
        apellido: "",
        plantel: "",
        semestre: "",
        rol: "alumno"
    });
    const router = useRouter();

    function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
        setForm((s) => ({ ...s, [k]: v }));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch("/evreb/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, semestre: Number(form.semestre) })
        });
        if (res.ok) {
            // Evita alert bloqueante y navega con una bandera para mostrar mensaje en login
            router.replace("/login?registered=1");
        } else {
            const data = await res.json().catch(() => ({}));
            alert(data?.error ?? "Error en registro");
        }
    }

    return (
        <main className="page-container">
            <div className="card form-card">
                <h1 className="form-title text-2xl">Registro</h1>
                <form onSubmit={onSubmit} className="form-grid">
                    <div className="field">
                        <label className="label-text">Usuario</label>
                        <input className="input" placeholder="Usuario" value={form.username} onChange={(e) => set("username", e.target.value)} required />
                    </div>
                    <div className="field">
                        <label className="label-text">Contraseña</label>
                        <input className="input" type="password" placeholder="Contraseña" value={form.password} onChange={(e) => set("password", e.target.value)} required />
                    </div>
                    <div className="field">
                        <label className="label-text">Nombre</label>
                        <input className="input" placeholder="Nombre" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required />
                    </div>
                    <div className="field">
                        <label className="label-text">Apellido</label>
                        <input className="input" placeholder="Apellido" value={form.apellido} onChange={(e) => set("apellido", e.target.value)} required />
                    </div>
                    <div className="field">
                        <label className="label-text">Plantel</label>
                        <input className="input" placeholder="Plantel" value={form.plantel} onChange={(e) => set("plantel", e.target.value)} required />
                    </div>
                    <div className="field">
                        <label className="label-text">Semestre (1-6)</label>
                        <input className="input" type="number" placeholder="Semestre (1-6)" min={1} max={6} value={form.semestre} onChange={(e) => set("semestre", e.target.value)} required />
                    </div>
                    <div className="field">
                        <label className="label-text">Rol</label>
                        <select className="input" value={form.rol} onChange={(e) => set("rol", e.target.value as "alumno" | "admin")}>
                            <option value="alumno">alumno</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                    <button className="btn" type="submit">Crear cuenta</button>
                </form>
            </div>
        </main>
    );
}
