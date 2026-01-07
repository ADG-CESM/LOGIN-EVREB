"use client";
import { useState } from "react";
import Papa from "papaparse";
import { useRouter } from "next/navigation";

interface CsvUser {
    username: string;
    password?: string;
    nombre: string;
    apellido: string;
    plantel: string;
    semestre: string | number;
    rol: string;
}

export default function RegisterCsvPage() {
    const [users, setUsers] = useState<CsvUser[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse<CsvUser>(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                // Normalize keys to lowercase just in case, or assume correct headers
                // For now, assuming headers match our interface keys exactly
                setUsers(results.data);
            },
            error: (err) => {
                alert("Error leyendo CSV: " + err.message);
            }
        });
    };

    const handleRegister = async () => {
        if (users.length === 0) return;
        setLoading(true);

        try {
            const res = await fetch("/evreb/api/register-csv", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ users }),
            });

            const data = await res.json();
            if (res.ok) {
                const successes = data.results.filter((r: any) => r.status === "success").length;
                const errors = data.results.filter((r: any) => r.status === "error");

                if (errors.length > 0) {
                    alert(`Registrados: ${successes}. Errores: ${errors.length}\nVer consola para detalles.`);
                    console.log("Errores:", errors);
                } else {
                    alert(`Todos los ${successes} usuarios registrados con éxito.`);
                    router.push("/login?registered=1");
                }
            } else {
                alert(data.error || "Error en registro masivo");
            }
        } catch (e) {
            console.error(e);
            alert("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="page-container p-4">
            <div className="card w-full max-w-4xl mx-auto bg-base-100 shadow-xl p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Registro Masivo (CSV)</h1>

                <div className="mb-6">
                    <p className="mb-2 text-sm opacity-70">
                        Sube un archivo CSV con las cabeceras:
                        <code className="bg-base-200 px-1 rounded">username, password, nombre, apellido, plantel, semestre, rol</code>
                    </p>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                </div>

                {users.length > 0 && (
                    <div className="overflow-x-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Previsualización ({users.length} usuarios)</h2>
                            <button
                                className={`btn btn-primary ${loading ? "loading" : ""}`}
                                onClick={handleRegister}
                                disabled={loading}
                            >
                                {loading ? "Registrando..." : "Registrar Todos"}
                            </button>
                        </div>
                        <table className="table table-zebra w-full text-sm">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Plantel</th>
                                    <th>Semestre</th>
                                    <th>Rol</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u, i) => (
                                    <tr key={i}>
                                        <td>{u.username}</td>
                                        <td>{u.nombre}</td>
                                        <td>{u.apellido}</td>
                                        <td>{u.plantel}</td>
                                        <td>{u.semestre}</td>
                                        <td>{u.rol}</td>
                                        <td className="opacity-50">{u.password || "1234 (default)"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}
