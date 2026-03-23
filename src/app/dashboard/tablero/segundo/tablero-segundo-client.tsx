"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ClassCard } from "../../../components/aula";
import { MateriaCard } from "../../../components/materia";
import { Newspaper, School, Link as LinkIcon } from "lucide-react";

const aulas = [
    { name: "Matemáticas II", id: 1, color: "#005da0", semestre: 2, plantel: "CCH" },
    { name: "Taller de Lectura, Redacción e Iniciación a la Investigación Documental II", id: 2, color: "#34a853", semestre: 2, plantel: "CCH" },
    { name: "Francés II", id: 3, color: "#037074", semestre: 2, plantel: "CCH" },
    { name: "Química II", id: 4, color: "#ea4335", semestre: 2, plantel: "CCH" },
    { name: "Inglés II", id: 5, color: "#ff6d00", semestre: 2, plantel: "CCH" },
    { name: "Historia Universal y Contemporánea II", id: 6, color: "#8e24aa", semestre: 2, plantel: "CCH" },
];

interface Material {
    id: number;
    title: string;
    url: string;
    urlMaterial: string;
    ubication: "RUA" | "CCH" | "Referencias";
    type: string;
    descripcion: string;
    citaApa?: string;
}

const materialsByAulas: Record<string, Material[]> = {
    "1": [
        {
            id: 1,
            title: "Funciones cuadráticas",
            descripcion: "Video introductorio sobre función cuadrática, su forma general y representación gráfica.",
            url: "https://www.youtube.com/results?search_query=funciones+cuadraticas",
            urlMaterial: "https://www.youtube.com/watch?v=93Q4hN4fGkA",
            ubication: "RUA",
            type: "video",
        },
        {
            id: 2,
            title: "Geometría analítica: parábola",
            descripcion: "Recurso de apoyo para identificar elementos de la parábola y resolver ejercicios básicos.",
            url: "https://portalacademico.cch.unam.mx/",
            urlMaterial: "https://portalacademico.cch.unam.mx/",
            ubication: "CCH",
            type: "web",
        },
    ],
    "2": [
        {
            id: 1,
            title: "Lectura crítica de textos académicos",
            descripcion: "Guía para estrategias de lectura, identificación de tesis y elaboración de síntesis.",
            url: "https://www.unam.mx/",
            urlMaterial: "https://www.unam.mx/",
            ubication: "CCH",
            type: "web",
        },
        {
            id: 2,
            title: "Redacción de reseña crítica",
            descripcion: "Ejemplo práctico de estructura de reseña con recomendaciones de estilo y argumentación.",
            url: "https://rua.unam.mx/",
            urlMaterial: "https://rua.unam.mx/",
            ubication: "RUA",
            type: "web",
        },
    ],
    "3": [
        {
            id: 1,
            title: "Compréhension orale – niveau A1/A2",
            descripcion: "Actividad de comprensión auditiva básica con ejercicios guiados en francés.",
            url: "https://www.tv5monde.com/",
            urlMaterial: "https://apprendre.tv5monde.com/",
            ubication: "Referencias",
            type: "web",
        },
        {
            id: 2,
            title: "Vocabulario cotidiano en francés",
            descripcion: "Material interactivo para ampliar vocabulario de presentaciones, familia y escuela.",
            url: "https://rua.unam.mx/",
            urlMaterial: "https://rua.unam.mx/",
            ubication: "RUA",
            type: "web",
        },
    ],
    "4": [
        {
            id: 1,
            title: "Enlace químico y estructura molecular",
            descripcion: "Video de repaso sobre enlaces iónico, covalente y metálico con ejemplos cotidianos.",
            url: "https://www.youtube.com/results?search_query=enlace+quimico",
            urlMaterial: "https://www.youtube.com/watch?v=QXT4OVM4vXI",
            ubication: "RUA",
            type: "video",
        },
        {
            id: 2,
            title: "Simulador de laboratorio virtual",
            descripcion: "Herramienta para practicar reacciones químicas y observar cambios en condiciones de laboratorio.",
            url: "https://chemcollective.org/vlab/vlab.php",
            urlMaterial: "https://chemcollective.org/vlab/vlab.php",
            ubication: "Referencias",
            type: "web",
        },
    ],
    "5": [
        {
            id: 1,
            title: "Reading comprehension: short texts",
            descripcion: "Ejercicios de comprensión lectora en inglés con preguntas de opción múltiple.",
            url: "https://learnenglish.britishcouncil.org/",
            urlMaterial: "https://learnenglish.britishcouncil.org/skills/reading",
            ubication: "Referencias",
            type: "web",
        },
        {
            id: 2,
            title: "Grammar practice: past and present",
            descripcion: "Práctica de gramática enfocada en tiempos verbales de uso frecuente en segundo semestre.",
            url: "https://portalacademico.cch.unam.mx/",
            urlMaterial: "https://portalacademico.cch.unam.mx/",
            ubication: "CCH",
            type: "web",
        },
    ],
    "6": [
        {
            id: 1,
            title: "Segunda Guerra Mundial: causas y consecuencias",
            descripcion: "Recurso audiovisual para comprender eventos clave del siglo XX y su impacto global.",
            url: "https://rua.unam.mx/",
            urlMaterial: "https://rua.unam.mx/",
            ubication: "RUA",
            type: "video",
        },
        {
            id: 2,
            title: "Línea del tiempo contemporánea",
            descripcion: "Actividad para identificar procesos históricos relevantes de la edad contemporánea.",
            url: "https://www.unesco.org/",
            urlMaterial: "https://www.unesco.org/",
            ubication: "Referencias",
            type: "web",
        },
    ],
};

export default function TableroSegundoClient() {
    const [selectedAulasId, setSelectedAulasId] = useState<string | null>(String(aulas[0].id));
    const [selectedUbication, setSelectedUbication] = useState<"RUA" | "CCH" | "Referencias">("RUA");
    const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);

    function handleMaterialClick(id: number) {
        setSelectedMaterialId((prev) => (prev === id ? null : id));
    }

    useEffect(() => {
        if (!selectedAulasId) return;
        const all = materialsByAulas[selectedAulasId] ?? [];
        const counts = all.reduce(
            (acc, m) => {
                if (m.ubication === "RUA") acc.RUA += 1;
                if (m.ubication === "CCH") acc.CCH += 1;
                if (m.ubication === "Referencias") acc.Referencias += 1;
                return acc;
            },
            { RUA: 0, CCH: 0, Referencias: 0 }
        );
        if (counts[selectedUbication] === 0) {
            const fallback = (["Referencias", "RUA", "CCH"] as const).find((k) => counts[k] > 0);
            if (fallback && fallback !== selectedUbication) {
                setSelectedUbication(fallback);
            }
        }
    }, [selectedAulasId, selectedUbication]);

    return (
        <div className="h-[calc(100vh-87.5px)] sm:h-[calc(100vh)] overflow-hidden flex flex-col">
            <div className="flex flex-col sm:flex-row px-2 py-2">
                <div
                    className="flex sm:flex-col flex-row sm:border-r border-b sm:border-b-0 border-gray-200 w-full sm:w-fit gap-4 overflow-x-auto sm:overflow-y-auto max-h-[calc(100vh)] pb-4 pt-4 sm:px-2 px-4 snap-x snap-mandatory scroll-smooth custom-scrollbar"
                    style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
                >
                    {aulas.map((aula) => {
                        const materials = materialsByAulas[String(aula.id)] ?? [];
                        const counts = materials.reduce(
                            (acc, m) => {
                                if (m.ubication === "RUA") acc.RUA += 1;
                                if (m.ubication === "CCH") acc.CCH += 1;
                                if (m.ubication === "Referencias") acc.Referencias += 1;
                                return acc;
                            },
                            { RUA: 0, CCH: 0, Referencias: 0 }
                        );

                        return (
                            <div key={aula.id} className="flex-shrink-0 w-48 sm:w-72 border-2 border-gray-200 rounded-2xl snap-start sm:mx-0 mx-2">
                                <ClassCard
                                    id={String(aula.id)}
                                    name={aula.name}
                                    RUA={counts.RUA}
                                    CCH={counts.CCH}
                                    Referencias={counts.Referencias}
                                    color={aula.color}
                                    isSelected={selectedAulasId === String(aula.id)}
                                    onClick={() => setSelectedAulasId(String(aula.id))}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="flex-1 p-4" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}>
                    {selectedAulasId ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-2 justify-center flex">
                                {aulas.find((a) => a.id === Number(selectedAulasId))?.name}
                            </h2>
                            <div className="mt-2">
                                <div className="flex p-2 flex-row gap-2 items-center justify-center">
                                    {(() => {
                                        const all = materialsByAulas[selectedAulasId ?? ""] ?? [];
                                        const counts = all.reduce(
                                            (acc, m) => {
                                                if (m.ubication === "RUA") acc.RUA += 1;
                                                if (m.ubication === "CCH") acc.CCH += 1;
                                                if (m.ubication === "Referencias") acc.Referencias += 1;
                                                return acc;
                                            },
                                            { RUA: 0, CCH: 0, Referencias: 0 }
                                        );

                                        const options: Array<{ label: string; value: "RUA" | "CCH" | "Referencias"; icon: ReactNode; count: number; title: string }> = [
                                            {
                                                label: "RUA",
                                                value: "RUA",
                                                icon: <Newspaper className="w-4 h-4" />,
                                                count: counts.RUA,
                                                title: "Recursos en RUA (revista digital)",
                                            },
                                            {
                                                label: "Portal CCH",
                                                value: "CCH",
                                                icon: <School className="w-4 h-4" />,
                                                count: counts.CCH,
                                                title: "Recursos del Portal Académico CCH",
                                            },
                                            {
                                                label: "Referencias",
                                                value: "Referencias",
                                                icon: <LinkIcon className="w-4 h-4" />,
                                                count: counts.Referencias,
                                                title: "Referencias digitales externas",
                                            },
                                        ];

                                        return options.map((opt) => {
                                            const isActive = selectedUbication === opt.value;
                                            const isDisabled = opt.count === 0 || !selectedAulasId;
                                            return (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    title={opt.title}
                                                    aria-label={`${opt.label} (${opt.count})`}
                                                    aria-pressed={isActive}
                                                    aria-disabled={isDisabled}
                                                    disabled={isDisabled}
                                                    onClick={() => setSelectedUbication(opt.value)}
                                                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 disabled:opacity-40 disabled:cursor-not-allowed ${isActive
                                                            ? "bg-gray-800 text-white border-gray-800 shadow-sm"
                                                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {opt.icon}
                                                    <span className="truncate max-w-[8ch] sm:max-w-none">{opt.label}</span>
                                                    <span
                                                        className={`ml-1 inline-flex items-center justify-center rounded-full text-xs font-medium ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"
                                                            } px-2 py-[2px]`}
                                                    >
                                                        {opt.count}
                                                    </span>
                                                </button>
                                            );
                                        });
                                    })()}
                                </div>

                                <div className="flex flex-row flex-wrap gap-12 w-fit overflow-auto max-h-[calc(100vh-87.25px)] pb-[290px] sm:pb-[130px] pt-4 sm:px-2 px-0 custom-scrollbar">
                                    {(() => {
                                        const all = materialsByAulas[selectedAulasId ?? ""];
                                        const filtered = (all ?? []).filter((m: Material) => m.ubication === selectedUbication);
                                        if (!filtered || filtered.length === 0) {
                                            return <p>No hay recursos disponibles para esta ubicación.</p>;
                                        }

                                        return filtered.map((material: Material) => (
                                            <div key={material.id} className="flex w-full sm:w-auto">
                                                <MateriaCard
                                                    ubication={material.ubication}
                                                    id={String(material.id)}
                                                    title={material.title}
                                                    url={material.url}
                                                    urlMaterial={material.urlMaterial}
                                                    type={material.type}
                                                    isSelected={selectedMaterialId === material.id}
                                                    onClick={() => handleMaterialClick(material.id)}
                                                    descripcion={material.descripcion}
                                                    citaApa={material.citaApa}
                                                />
                                            </div>
                                        ));
                                    })()}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">Selecciona un aula para ver los materiales.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
