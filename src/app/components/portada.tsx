"use client";

import Link from "next/link";
import { GraduationCap, Newspaper, Link as LinkIcon } from "lucide-react";

export default function Portada() {
    const portadas = [
        {
            etiqueta: "Navegacion de Recursos Educativos",
            titulo: "RECURSOS EDUCATIVOS - PRIMER SEMESTRE",
            href: "/dashboard/tablero",
            cta: "Explorar tablero de primer semestre",
        },
        {
            etiqueta: "Navegacion de Recursos Educativos",
            titulo: "RECURSOS EDUCATIVOS - SEGUNDO SEMESTRE",
            href: "/dashboard/tablero/segundo",
            cta: "Explorar tablero de segundo semestre",
        },
    ];

    return (
        <section className="relative isolate overflow-hidden py-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white" />
                <div
                    aria-hidden
                    className="absolute -top-24 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full blur-3xl"
                    style={{
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.35) 0%, rgba(29,78,216,0.15) 45%, rgba(255,255,255,0) 70%)",
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="space-y-8 sm:space-y-10">
                    {portadas.map((portada, index) => (
                        <div
                            key={portada.href}
                            className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-indigo-100/80 bg-white/60 p-6 shadow-sm backdrop-blur-sm lg:grid-cols-2 lg:gap-12 lg:p-10"
                        >
                            <div>
                                <span className="inline-flex items-center rounded-full bg-indigo-100/70 px-3 py-1 text-xs font-medium text-[#193d77] ring-1 ring-inset ring-indigo-200">
                                    {portada.etiqueta}
                                </span>
                                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                    {portada.titulo}
                                </h1>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                                    <Link
                                        href={portada.href}
                                        className="inline-flex items-center justify-center rounded-xl bg-[#193d77] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#163463] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#193d77]/50 focus-visible:ring-offset-2 active:scale-[0.99]"
                                    >
                                        {portada.cta}
                                    </Link>
                                </div>

                                <dl className="mt-8 grid max-w-md grid-cols-3 gap-4" id="features">
                                    <div className="rounded-xl border border-indigo-100 bg-white p-3 text-center">
                                        <dt className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                                            <Newspaper className="h-4 w-4 text-[#193d77]" /> RUA
                                        </dt>
                                    </div>
                                    <div className="rounded-xl border border-indigo-100 bg-white p-3 text-center">
                                        <dt className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                                            <GraduationCap className="h-4 w-4 text-[#193d77]" /> CCH
                                        </dt>
                                    </div>
                                    <div className="rounded-xl border border-indigo-100 bg-white p-3 text-center">
                                        <dt className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                                            <LinkIcon className="h-4 w-4 text-[#193d77]" /> Referencias
                                        </dt>
                                    </div>
                                </dl>
                            </div>

                            <div
                                className={`relative ${index % 2 === 1
                                        ? "order-first lg:order-first"
                                        : "order-first lg:order-last"
                                    }`}
                            >
                                <div className="mx-auto w-full max-w-xl">
                                    <div className="relative rounded-2xl border border-indigo-100 bg-white/80 p-3 shadow-sm backdrop-blur">
                                        <div className="flex items-center gap-1.5 pb-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                        </div>
                                        <div className="overflow-hidden rounded-xl border border-indigo-100/70 bg-gradient-to-br from-indigo-50 to-blue-50">
                                            <video
                                                className="h-64 w-full object-contain p-6 sm:h-80"
                                                src="/evreb/video_animado.mp4"
                                                autoPlay
                                                muted
                                                playsInline
                                                preload="auto"
                                                aria-label="Animacion ilustrativa de recursos"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
