"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OpenMaterialButton from "../components/open-material-button";
import { Crown, Eye } from "lucide-react";

export type Item = { key: string; title?: string; urlMaterial?: string; count: number; type?: string; ubication?: string };

type Props = {
    initialItems: Item[];
};

export default function MasVisitadosClient({ initialItems }: Props) {
    const [items, setItems] = useState<Item[]>(initialItems || []);
    const timerRef = useRef<number | null>(null);

    const fetchTop = async () => {
        try {
            const res = await fetch("/evreb/api/metrics/view?top=20", { cache: "no-store" });
            if (!res.ok) return;
            const data = await res.json();
            if (Array.isArray(data?.items)) setItems(data.items);
        } catch {
            // ignore
        }
    };

    useEffect(() => {
        // Auto-refresh every 5s
        timerRef.current = window.setInterval(fetchTop, 5000);
        // Refresh on focus to reflect quick changes
        const onFocus = () => fetchTop();
        window.addEventListener("focus", onFocus);
        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
            window.removeEventListener("focus", onFocus);
        };
    }, []);

    const total = useMemo(() => items.reduce((sum, i) => sum + (i.count || 0), 0), [items]);

    return (
        <div>
            {items.length === 0 ? (
                <div className="text-center py-12">
                    <Eye className="w-8 h-8 mx-auto text-slate-400" />
                    <p className="mt-2 opacity-70">Aún no hay registros.</p>
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
                            return (
                                <div key={it.key} className="relative group p-3 sm:p-4 w-full h-[240px] sm:h-[260px] min-w-0 rounded-2xl border border-indigo-100/70 bg-gradient-to-br from-indigo-100 to-blue-100 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                                    {idx === 0 && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-300/90 border border-yellow-400 text-yellow-900 shadow">
                                                <Crown className="w-4 h-4" />
                                                Más visitado
                                            </span>
                                        </div>
                                    )}
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
                                    </div>
                                    <div className="mt-2 flex justify-center">
                                        <OpenMaterialButton
                                            materialId={it.key !== it.urlMaterial ? it.key : undefined}
                                            title={it.title}
                                            urlMaterial={it.urlMaterial}
                                            ubication={it.ubication}
                                            type={it.type}
                                            onOpened={() => {
                                                // Reintenta refrescar poco después del clic para reflejar el incremento
                                                setTimeout(fetchTop, 600);
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-4 flex items-center justify-end text-xs opacity-60">
                        Total vistas: {total}
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                        <Link href="/dashboard/tablero" className="btn btn-light">Volver al tablero</Link>
                    </div>
                </div>
            )}
        </div>
    );
}
