import { pool } from "@/lib/db";
import { TrendingUp } from "lucide-react";
import MasVisitadosClient, { Item as ClientItem } from "./mas-visitados-client";

export const dynamic = "force-dynamic";

type Item = ClientItem;

export default async function MasVisitadosPage() {
  let items: Item[] = [];
  try {
    const { rows } = await pool.query(
      `SELECT key, title, url_material AS "urlMaterial", count, type, ubication
       FROM material_views
       ORDER BY count DESC
       LIMIT 20`
    );
    items = rows.map((d: any) => ({
      key: d.key,
      title: d.title,
      urlMaterial: d.urlMaterial,
      count: Number(d.count ?? 0),
      type: d.type,
      ubication: d.ubication,
    }));
  } catch { items = []; }

  return (
    <main className="page-container p-4 sm:p-6">
      <div className="card w-full max-w-4xl mx-auto bg-base-100 shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold">Más visitados</h1>
          </div>
          <p className="text-sm opacity-70 mb-4">Top 20 recursos más consultados.</p>
          <MasVisitadosClient initialItems={items} />
        </div>
      </div>
    </main>
  );
}
