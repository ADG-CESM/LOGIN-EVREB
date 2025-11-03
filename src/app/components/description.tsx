"use client";

import { useEffect, useRef, useState } from "react";
export interface DescripcionProps {
    title: string;
    descripcion: string;
    url: string;
    urlMaterial: string;
    ubication?: string;
    type?: string;
}
export function Descripcion({ title, descripcion, url, urlMaterial, ubication, type }: DescripcionProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

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
                    >
                        Ir a recurso
                    </a>
                )}
            </div>
        </div>
    );
}
