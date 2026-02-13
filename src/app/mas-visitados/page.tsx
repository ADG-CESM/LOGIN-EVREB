import { getMongoDb } from "@/lib/mongo";
import { TrendingUp } from "lucide-react";
import MasVisitadosClient, { Item as ClientItem } from "./mas-visitados-client";

export const dynamic = "force-dynamic"; // ensure fresh fetch during dev

type Item = ClientItem;

export default async function MasVisitadosPage() {
  const db = await getMongoDb();
  let items: Item[] = [];

  if (db) {
    type ViewDoc = { key: string; title?: string; urlMaterial?: string; count?: number; type?: string; ubication?: string };
    const col = db.collection<ViewDoc>("materialViews");
    const cursor = col
      .find({}, { projection: { key: 1, title: 1, urlMaterial: 1, count: 1, type: 1, ubication: 1 } })
      .sort({ count: -1 })
      .limit(20);
    const raw = await cursor.toArray();
    items = raw.map((d) => ({
      key: d.key,
      title: d.title,
      urlMaterial: d.urlMaterial,
      count: Number(d.count ?? 0),
      type: d.type,
      ubication: d.ubication,
    }));
  }

  // const total = items.reduce((sum, i) => sum + (i.count || 0), 0);

  return (
    <main className="page-container p-4 sm:p-6">
      <div className="card w-full max-w-4xl mx-auto bg-base-100 shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold">Más visitados</h1>
          </div>
          <p className="text-sm opacity-70 mb-4">Top 20 recursos más consultados.</p>

          {!db && (
            <div className="alert alert-error mb-4">
              <span>MongoDB no está configurado. Define MONGODB_URI y MONGODB_DB.</span>
            </div>
          )}

          <MasVisitadosClient initialItems={items} />
        </div>
      </div>
    </main>
  );
}
