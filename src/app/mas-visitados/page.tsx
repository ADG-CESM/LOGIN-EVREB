import { getMongoDb } from "@/lib/mongo";
import Link from "next/link";
import Image from "next/image";
import OpenMaterialButton from "../components/open-material-button";
import { Eye, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic"; // ensure fresh fetch during dev

type Item = { key: string; title?: string; urlMaterial?: string; count: number; type?: string; ubication?: string };

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

  const total = items.reduce((sum, i) => sum + (i.count || 0), 0);
  const maxCount = Math.max(1, ...items.map((i) => i.count || 0));

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

          {items.length === 0 ? (
            <div className="text-center py-12">
              <Eye className="w-8 h-8 mx-auto text-slate-400" />
              <p className="mt-2 opacity-70">Aún no hay registros.</p>
              <p className="text-xs opacity-60 mt-1">Visita algún material y vuelve a esta página.</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((it, idx) => {
                  const lowerType = it.type ? String(it.type).toLowerCase() : "";
                  const imgSrc = lowerType === "video"
                    ? "/evreb/video.svg"
                    : lowerType === "pdf"
                      ? "/evreb/doc2.svg"
                      : lowerType === "podcast" || lowerType === "audio"
                        ? "/evreb/audio.svg"
                        : "/evreb/web.svg";
                  const percent = Math.round(((it.count || 0) / maxCount) * 100);
                  return (
                    <div key={it.key} className="relative group p-3 sm:p-4 w-full h-[240px] sm:h-[260px] min-w-0 rounded-2xl border border-indigo-100/70 bg-gradient-to-br from-indigo-100 to-blue-100 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/70 border border-indigo-200 text-indigo-700">
                          #{idx + 1}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/70 border border-indigo-200 text-indigo-700">
                          <Eye className="w-3 h-3" /> {it.count}
                        </span>
                      </div>
                      <div className="w-full overflow-hidden rounded-xl flex-shrink-0 border border-white/60 bg-white/60 shadow-inner">
                        <Image src={imgSrc} alt={it.title || it.key} width={600} height={200} className="w-full h-28 sm:h-36 object-cover rounded-xl" />
                      </div>
                      <div className="mt-2">
                        <h3 title={it.title || it.key} className="text-sm font-semibold mb-1 text-center text-indigo-900 truncate">
                          {it.title || it.key}
                        </h3>
                        <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden border border-white/70">
                          <div
                            className="h-full bg-indigo-500"
                            style={{ width: `${percent}%` }}
                            role="progressbar"
                            aria-valuenow={percent}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`Popularidad ${percent}%`}
                          />
                        </div>
                      </div>
                      <div className="mt-2 flex justify-center">
                        <OpenMaterialButton
                          title={it.title}
                          urlMaterial={it.urlMaterial}
                          ubication={it.ubication}
                          type={it.type}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-end text-xs opacity-60">
                Total vistas: {total}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between items-center">
            <Link href="/dashboard/tablero" className="btn btn-light">Volver al tablero</Link>
            <span className="text-xs opacity-60">Actualizado al cargar la página</span>
          </div>
        </div>
      </div>
    </main>
  );
}
