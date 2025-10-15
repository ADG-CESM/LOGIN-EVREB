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
            alert("Registro exitoso. Inicia sesión.");
            router.push("/login");
        } else {
            const data = await res.json().catch(() => ({}));
            alert(data?.error ?? "Error en registro");
        }
    }

    return (
        <main style={{ padding: 24 }}>
            <h1>Registro</h1>
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
                <input placeholder="Usuario" value={form.username} onChange={(e) => set("username", e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={form.password} onChange={(e) => set("password", e.target.value)} required />
                <input placeholder="Nombre" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required />
                <input placeholder="Apellido" value={form.apellido} onChange={(e) => set("apellido", e.target.value)} required />
                <input placeholder="Plantel" value={form.plantel} onChange={(e) => set("plantel", e.target.value)} required />
                <input type="number" placeholder="Semestre (1-12)" min={1} max={12} value={form.semestre} onChange={(e) => set("semestre", e.target.value)} required />
                <select value={form.rol} onChange={(e) => set("rol", e.target.value as "alumno" | "admin")}>
                    <option value="alumno">alumno</option>
                    <option value="admin">admin</option>
                </select>
                <button type="submit">Crear cuenta</button>
            </form>
        </main>
    );
}
