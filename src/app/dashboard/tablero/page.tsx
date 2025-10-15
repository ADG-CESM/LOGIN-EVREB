import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

export default async function TableroPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect("/login");

    return (
        <main style={{ padding: 24 }}>
            <h1>Tablero</h1>
        </main>
    );
}
