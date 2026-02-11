import Link from "next/link";

export default async function DashboardPage() {
    return (
        <main style={{ padding: 24 }}>
            <h1>Bienvenido al Dashboard</h1>
            <p>El acceso ya no requiere iniciar sesión.</p>
            <p>
                Explora el <Link href="/dashboard/tablero" className="link">tablero</Link> para ver materiales.
            </p>
            <p>
                Consulta los <Link href="/mas-visitados" className="link">más visitados</Link>.
            </p>
        </main>
    );
}
