
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ClassCard } from "../../components/aula";
import { MateriaCard } from "../../components/materia";
import { Newspaper, School, Link as LinkIcon } from 'lucide-react';

const aulas = [
    { name: "Matemáticas I", id: 1, color: "#005da0", semestre: 1, plantel: "CCH" },
    { name: "Taller de Lectura, Redacción e Iniciación a la Investigación Documental I", id: 2, color: "#34a853", semestre: 1, plantel: "CCH" },
    { name: "Química I", id: 3, color: "#ea4335", semestre: 1, plantel: "CCH" },
    { name: "Historia Universal y Contemporánea I", id: 4, color: "#8e24aa", semestre: 1, plantel: "CCH" },
    { name: "Igualdad de Género", id: 5, color: "#b6dcef", semestre: 1, plantel: "CCH" },
    { name: "Francés I -IV", id: 6, color: "#037074", semestre: 1, plantel: "CCH" },
    { name: "Inglés I-IV", id: 7, color: "#ff6d00", semestre: 1, plantel: "CCH" },
    { name: "Taller de Cómputo", id: 8, color: "#f9d980", semestre: 1, plantel: "CCH" },
    { name: "Educación física", id: 9, color: "#7c4dff", semestre: 1, plantel: "CCH" },
];

interface Material {
    id: number;
    title: string;
    url: string;
    urlMaterial: string;
    ubication: 'RUA' | 'CCH' | 'Referencias';
    type: string;
    descripcion: string;
}

const materialsByAulas: Record<string, Material[]> = {
    "1": [
        {
            "id": 1,
            "title": "Funciones lineales",
            "descripcion": "Video que contiene un curso en el que un profesor explica los trucos y técnicas para resolver funciones lineales con ejercicios y ejemplos.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2437",
            "urlMaterial": "https://youtu.be/bFW3eRL1hpc?si=siWMsSWoOujnUDhO",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 2,
            "title": "Ecuaciones de primer grado",
            "descripcion": "Video que explica cómo resolver ecuaciones de primer grado con ejemplos y ejercicios prácticos.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2438",
            "urlMaterial": "https://youtu.be/abc123",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 3,
            "title": "Sistemas de ecuaciones",
            "descripcion": "Curso en video sobre la resolución de sistemas de ecuaciones lineales, con ejercicios y ejemplos prácticos.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2439",
            "urlMaterial": "https://youtu.be/def456",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 4,
            "title": "Inecuaciones",
            "descripcion": "Lección en video sobre cómo resolver inecuaciones, incluyendo ejemplos y ejercicios prácticos.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2440",
            "urlMaterial": "https://youtu.be/ghi789",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 5,
            "title": "Polinomios",
            "descripcion": "Video que explica qué son los polinomios y cómo se suman, restan y multiplican.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2441",
            "urlMaterial": "https://youtu.be/jkl012",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 6,
            "title": "Funciones cuadráticas",
            "descripcion": "Curso en video sobre las funciones cuadráticas, su representación gráfica y cómo resolver ecuaciones cuadráticas.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2442",
            "urlMaterial": "https://youtu.be/mno345",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 7,
            "title": "Estadística descriptiva",
            "descripcion": "Lección en video sobre conceptos básicos de estadística descriptiva, incluyendo media, mediana y moda.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2443",
            "urlMaterial": "https://youtu.be/pqr678",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 8,
            "title": "Probabilidad",
            "descripcion": "Video que explica los conceptos básicos de probabilidad y cómo calcular probabilidades simples.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2444",
            "urlMaterial": "https://youtu.be/stu901",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 9,
            "title": "Geometría analítica",
            "descripcion": "Curso en video sobre geometría analítica, incluyendo la recta numérica, el plano cartesiano y cómo graficar ecuaciones lineales.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2445",
            "urlMaterial": "https://youtu.be/vwx234",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 10,
            "title": "Trigonometría",
            "descripcion": "Lección en video sobre las funciones trigonométricas básicas y cómo resolver triángulos rectángulos.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2446",
            "urlMaterial": "https://youtu.be/yza567",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 11,
            "title": "Matrices",
            "descripcion": "Video que explica qué son las matrices y cómo se suman, restan y multiplican.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2447",
            "urlMaterial": "https://youtu.be/abc890",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 12,
            "title": "Determinantes",
            "descripcion": "Curso en video sobre cómo calcular determinantes de matrices 2x2 y 3x3.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2448",
            "urlMaterial": "https://youtu.be/def123",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 13,
            "title": "Álgebra de Boole",
            "descripcion": "Lección en video sobre los fundamentos del álgebra de Boole y sus aplicaciones en la lógica digital.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2449",
            "urlMaterial": "https://youtu.be/ghi456",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 14,
            "title": "Operaciones aritméticas",
            "descripcion": "Lección que presenta ejercicios y ejemplos de apoyo al alumno para resolver algoritmos tradicionales de suma, resta, multiplicación y división con números enteros y racionales.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2367",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/matematicas1/unidad1/OpNumerosEnteros",
            "ubication": "RUA",
            "type": "web"
        },
        {
            "id": 15,
            "title": "Matemáticas I",
            "descripcion": "Objetos de Aprendizaje para desarrollar la capacidad de análisis-síntesis en la resolución de problemas y comprensión de conceptos matemáticos.",
            "url": "https://portalacademico.cch.unam.mx/alumno/matematicas1",
            "urlMaterial": "nan",
            "ubication": "CCH",
            "type": "web"
        },
    ],
    "3": [],
    "2": [
        {
            "id": 1,
            "title": "Análisis e interpretación del poema lírico",
            "descripcion": "Beristáin, H. (1989). Análisis e interpretación del poema lírico. IIFL/UNAM.",
            "url": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/41",
            "urlMaterial": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/41",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 2,
            "title": "El poema como forma literaria",
            "descripcion": "González, A. (1995). El poema como forma literaria. IIFL/UNAM.",
            "url": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/42",
            "urlMaterial": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/42",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 3,
            "title": "Recursos poéticos",
            "descripcion": "Estudio sobre los recursos poéticos más utilizados en la poesía en lengua española.",
            "url": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/43",
            "urlMaterial": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/43",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 4,
            "title": "La métrica en la poesía española",
            "descripcion": "Curso sobre la métrica en la poesía española, incluyendo ejercicios y ejemplos prácticos.",
            "url": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/44",
            "urlMaterial": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/44",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 5,
            "title": "El soneto",
            "descripcion": "Estudio detallado sobre el soneto, una de las formas poéticas más importantes de la literatura española.",
            "url": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/45",
            "urlMaterial": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/45",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 6,
            "title": "La lírica popular",
            "descripcion": "Análisis de la lírica popular en España y su influencia en la poesía culta.",
            "url": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/46",
            "urlMaterial": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/46",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 7,
            "title": "TLRIID 2",
            "descripcion": "Los Objetos de Aprendizaje para desarrollar la competencia comunicativa en torno a la lectura, la escritura, el escucha, el habla, la investigación y la literatura.",
            "url": "https://portalacademico.cch.unam.mx/alumno/tlriid2",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/tlriid2",
            "ubication": "CCH",
            "type": "web"
        }
    ],
};

export default function TableroClient() {
    const [selectedAulasId, setSelectedAulasId] = useState<string | null>(null);
    const [selectedUbication, setSelectedUbication] = useState<'RUA' | 'CCH' | 'Referencias'>('RUA');
    const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);

    function handleMaterialClick(id: number) {
        setSelectedMaterialId(prev => (prev === id ? null : id));
    }

    useEffect(() => {
        if (!selectedAulasId) return;
        const all = materialsByAulas[selectedAulasId] ?? [];
        const counts = all.reduce(
            (acc, m) => {
                if (m.ubication === 'RUA') acc.RUA += 1;
                if (m.ubication === 'CCH') acc.CCH += 1;
                if (m.ubication === 'Referencias') acc.Referencias += 1;
                return acc;
            },
            { RUA: 0, CCH: 0, Referencias: 0 }
        );
        if (counts[selectedUbication] === 0) {
            const fallback = (['Referencias', 'RUA', 'CCH'] as const).find(k => counts[k] > 0);
            if (fallback && fallback !== selectedUbication) {
                setSelectedUbication(fallback);
            }
        }
    }, [selectedAulasId, selectedUbication]);

    return (
        <div className="h-[calc(100vh-87.5px)] sm:h-[calc(100vh-87.25px)] overflow-hidden flex flex-col">
            <div className="flex flex-col sm:flex-row px-2 py-2">
                <div
                    className="flex sm:flex-col flex-row sm:border-r border-b sm:border-b-0 border-gray-200 w-full sm:w-fit gap-4 overflow-x-auto sm:overflow-y-auto max-h-[calc(100vh-100px)] pb-4 pt-4 sm:px-2 px-4 snap-x snap-mandatory scroll-smooth custom-scrollbar"
                    style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                >
                    {aulas.map(aula => {
                        const materials = materialsByAulas[String(aula.id)] ?? [];
                        const counts = materials.reduce(
                            (acc, m) => {
                                if (m.ubication === 'RUA') acc.RUA += 1;
                                if (m.ubication === 'CCH') acc.CCH += 1;
                                if (m.ubication === 'Referencias') acc.Referencias += 1;
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

                <div className="flex-1 p-4" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}>
                    {selectedAulasId ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-2 justify-center flex">
                                {aulas.find(a => a.id === Number(selectedAulasId))?.name}
                            </h2>
                            <div className="mt-2">
                                <div className="flex p-2 flex-row gap-2 items-center justify-center">
                                    {(() => {
                                        const all = materialsByAulas[selectedAulasId ?? ''] ?? [];
                                        const counts = all.reduce(
                                            (acc, m) => {
                                                if (m.ubication === 'RUA') acc.RUA += 1;
                                                if (m.ubication === 'CCH') acc.CCH += 1;
                                                if (m.ubication === 'Referencias') acc.Referencias += 1;
                                                return acc;
                                            },
                                            { RUA: 0, CCH: 0, Referencias: 0 }
                                        );

                                        const options: Array<{ label: string; value: 'RUA' | 'CCH' | 'Referencias'; icon: ReactNode; count: number; title: string }> = [
                                            {
                                                label: 'Referencias',
                                                value: 'Referencias',
                                                icon: <LinkIcon className="w-4 h-4" />,
                                                count: counts.Referencias,
                                                title: 'Referencias digitales externas'
                                            },
                                            {
                                                label: 'RUA',
                                                value: 'RUA',
                                                icon: <Newspaper className="w-4 h-4" />,
                                                count: counts.RUA,
                                                title: 'Recursos en RUA (revista digital)'
                                            },
                                            {
                                                label: 'Portal CCH',
                                                value: 'CCH',
                                                icon: <School className="w-4 h-4" />,
                                                count: counts.CCH,
                                                title: 'Recursos del Portal Académico CCH'
                                            },

                                        ];

                                        return options.map(opt => {
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
                                                        ? 'bg-gray-800 text-white border-gray-800 shadow-sm'
                                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {opt.icon}
                                                    <span className="truncate max-w-[8ch] sm:max-w-none">{opt.label}</span>
                                                    <span className={`ml-1 inline-flex items-center justify-center rounded-full text-xs font-medium ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'} px-2 py-[2px]`}>
                                                        {opt.count}
                                                    </span>
                                                </button>
                                            );
                                        });
                                    })()}
                                </div>

                                <div className="flex flex-row flex-wrap gap-12 w-fit overflow-auto max-h-[calc(100vh-87.25px)] pb-[290px] sm:pb-[130px] pt-4 sm:px-2 px-0 custom-scrollbar">
                                    {(() => {
                                        const all = materialsByAulas[selectedAulasId ?? ''];
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
