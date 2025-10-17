"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Newspaper, Link as LinkIcon } from "lucide-react";

export default function Portada() {
    return (
        <section className="relative isolate overflow-hidden">
            {/* Fondo decorativo */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white" />
                <div
                    aria-hidden
                    className="absolute -top-24 left-1/2 -translate-x-1/2 h-[480px] w-[880px] rounded-full blur-3xl"
                    style={{
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.35) 0%, rgba(29,78,216,0.15) 45%, rgba(255,255,255,0) 70%)",
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                    {/* Texto principal */}
                    <div>
                        <span className="inline-flex items-center rounded-full bg-indigo-100/70 px-3 py-1 text-xs font-medium text-[#193d77] ring-1 ring-inset ring-indigo-200">
                            Navegación de Recursos Educativos
                        </span>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                            RECURSOS EDUCATIVOS
                        </h1>
                        <p className="mt-4 text-base leading-7 text-[#193d77] sm:text-lg">

                        </p>

                        {/* Acciones */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Link
                                href="/tablero"
                                className="inline-flex items-center justify-center rounded-xl bg-[#193d77] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#163463] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#193d77]/50 active:scale-[0.99]"
                            >
                                Explorar tablero
                            </Link>
                            {/*<a
                                href="#features"
                                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#193d77] ring-1 ring-inset ring-[#193d77]/30 shadow-sm hover:bg-[#193d77]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#193d77]/40 active:scale-[0.99]"
                            >
                                Conocer más
                            </a>*/}
                        </div>

                        {/* Mini features */}
                        <dl className="mt-8 grid grid-cols-3 gap-4 max-w-md" id="features">
                            <div className="rounded-xl border border-indigo-100 bg-white p-3 text-center">
                                <dt className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                                    <Newspaper className="h-4 w-4 text-[#193d77]" /> RUA
                                </dt>
                                {/* <dd className="mt-1 text-lg font-semibold text-slate-900">Recursos</dd>*/}
                            </div>
                            <div className="rounded-xl border border-indigo-100 bg-white p-3 text-center">
                                <dt className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                                    <GraduationCap className="h-4 w-4 text-[#193d77]" /> CCH
                                </dt>
                                {/*<dd className="mt-1 text-lg font-semibold text-slate-900">Materiales</dd>*/}
                            </div>
                            <div className="rounded-xl border border-indigo-100 bg-white p-3 text-center">
                                <dt className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                                    <LinkIcon className="h-4 w-4 text-[#193d77]" /> Referencias
                                </dt>
                                {/*<dd className="mt-1 text-lg font-semibold text-slate-900"></dd>*/}
                            </div>
                        </dl>
                    </div>

                    {/* Visual lado derecho */}
                    <div className="relative order-first lg:order-last">
                        <div className="mx-auto w-full max-w-xl">
                            <div className="relative rounded-2xl border border-indigo-100 bg-white/80 p-3 shadow-sm backdrop-blur">
                                <div className="flex items-center gap-1.5 pb-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                </div>
                                <div className="overflow-hidden rounded-xl border border-indigo-100/70 bg-gradient-to-br from-indigo-50 to-blue-50">
                                    <Image
                                        src="/evreb/web.svg"
                                        alt="Vista ilustrativa de recursos"
                                        width={900}
                                        height={600}
                                        priority
                                        className="h-64 w-full object-contain p-6 sm:h-80"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
