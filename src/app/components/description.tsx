"use client";

import { useEffect, useRef, useState } from "react";
export interface DescripcionProps {
    materialId?: string;
    title: string;
    descripcion: string;
    url: string;
    urlMaterial: string;
    ubication?: string;
    type?: string;
    citaApa?: string;
}
export function Descripcion({ materialId, title, descripcion, url, urlMaterial, ubication, type, citaApa }: DescripcionProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showCitation, setShowCitation] = useState(false);

    const lowerType = (type || "").toLowerCase();
    const isAudioType = lowerType === "podcast" || lowerType === "audio";
    const isAudioByUrl = /\.(mp3|wav|ogg)(\?|#|$)/i.test(urlMaterial);
    const isAudio = isAudioType || isAudioByUrl;

    const handleTogglePlayback = () => {
        const el = audioRef.current;
        if (!el) return;
        if (isPlaying) {
            el.pause();
        } else {
            const p = el.play();
            if (p && typeof p.catch === "function") {
                p.catch(() => { /* ignored */ });
            }
        }
    };

    useEffect(() => {
        const el = audioRef.current;
        if (!el) return;
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => setIsPlaying(false);
        el.addEventListener("play", onPlay);
        el.addEventListener("pause", onPause);
        el.addEventListener("ended", onEnded);
        return () => {
            el.removeEventListener("play", onPlay);
            el.removeEventListener("pause", onPause);
            el.removeEventListener("ended", onEnded);
        };
    }, []);

    // Close citation modal on Escape
    useEffect(() => {
        if (!showCitation) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowCitation(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [showCitation]);

    const citationText = (citaApa?.trim() || descripcion?.trim() || title);

    const handleCopyCitation = async () => {
        try {
            await navigator.clipboard.writeText(citationText);
        } catch {
            // ignored
        }
    };

    return (
        <div className="p-3 sm:p-4 h-full flex flex-col align-center rounded-2xl bg-white/80 backdrop-blur-md border border-indigo-100 shadow-md">
            <h2 className="text-xs sm:text-sm text-center font-semibold text-indigo-900">{title}</h2>
            <span className="text-xs sm:text-xs text-slate-700 mt-1 mb-3 text-justify leading-relaxed">
                {descripcion}
            </span>
            {/* Audio element with native controls when the resource is audio */}
            {isAudio && (
                <audio
                    ref={audioRef}
                    src={urlMaterial}
                    preload="metadata"
                    controls
                    className="w-full mt-1 my-2 rounded-lg bg-gray-100 border border-gray-300"
                />
            )}
            <div className="flex flex-wrap gap-2 mt-auto mx-auto">
                {ubication === "RUA" && (
                    <a
                        href={url}
                        className="bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm shadow hover:bg-indigo-700 active:scale-[0.99] transition-all"
                        target='_blank'
                    >Detalles</a>
                )}

                {ubication === "Referencias" && (
                    <button
                        type="button"
                        onClick={() => setShowCitation(true)}
                        className="bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm shadow hover:bg-indigo-700 active:scale-[0.99] transition-all"
                    >
                        Leer cita
                    </button>
                )}

                {isAudio ? (
                    <button
                        type="button"
                        onClick={handleTogglePlayback}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm shadow hover:bg-blue-700 active:scale-[0.99] transition-all"
                        aria-pressed={isPlaying}
                        aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
                    >
                        {isPlaying ? "Pausar" : "Reproducir"}
                    </button>
                ) : (
                    <a
                        href={urlMaterial}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm shadow hover:bg-blue-700 active:scale-[0.99] transition-all"
                        onClick={() => {
                            // Sumar SIEMPRE una vista por clic
                            try {
                                const payload = { materialId, title, urlMaterial, ubication, type };
                                const url = "/evreb/api/metrics/view";
                                if (navigator.sendBeacon) {
                                    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
                                    navigator.sendBeacon(url, blob);
                                } else {
                                    fetch(url, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(payload),
                                        keepalive: true,
                                    }).catch(() => { /* ignored */ });
                                }
                            } catch {
                                // ignore tracking errors
                            }
                        }}
                    >
                        Ir a recurso
                    </a>
                )}
            </div>

            {/* Modal de cita APA */}
            {showCitation && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setShowCitation(false)}
                        aria-hidden
                    />
                    <div className="relative z-10 w-full sm:w-[260px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl border border-indigo-100">
                        <div className="p-3 sm:p-4">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="text-sm font-semibold text-indigo-900">Cita APA</h3>
                                <button
                                    type="button"
                                    onClick={() => setShowCitation(false)}
                                    className="shrink-0 rounded-full p-1 text-slate-600 hover:bg-slate-100"
                                    aria-label="Cerrar"
                                >
                                    ✕
                                </button>
                            </div>
                            <p className="mt-2 text-xs sm:text-sm text-slate-800 whitespace-pre-line break-words leading-relaxed">
                                {citationText}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={handleCopyCitation}
                                    className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl text-xs shadow hover:bg-slate-200 active:scale-[0.99] transition-all"
                                >
                                    Copiar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCitation(false)}
                                    className="bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs shadow hover:bg-indigo-700 active:scale-[0.99] transition-all"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
