"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import TableroClient from "./tablero-client";

export default async function TableroPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect("/login");

    return <TableroClient />;
}
