
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
    citaApa?: string;
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
            "title": "Ecuaciones lineales: ejercicio 4",
            "descripcion": "Video que explica el proceso de solución de una ecuación lineal o de primer grado con una incógnita.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2454",
            "urlMaterial": "https://youtu.be/xeUWLZY4roM?si=PZbhMU0Q-VPqnpKI",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 3,
            "title": "Los números racionales",
            "descripcion": "Lección que explica qué son los números racionales. Este material fue desarrollado por la Facultad de Ciencias de la UNAM.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/3403",
            "urlMaterial": "https://ntecdi.fciencias.unam.mx/Reales/r_modelq01.html",
            "ubication": "RUA",
            "type": "web"
        },
        {
            "id": 4,
            "title": "Geometría analítica: rectas paralelas y perpendiculares",
            "descripcion": "Video que explica los conceptos de rectas paralelas y de rectas perpendiculares.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/76290",
            "urlMaterial": "https://www.youtube.com/watch?v=OvhqMbDaK4Q",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 5,
            "title": "Geometría analítica: ángulo de inclinación y pendiente de una recta",
            "descripcion": "Video que explica cómo calcular la pendiente y el ángulo de inclinación de una recta que pasa por dos puntos. Presenta varios ejemplos.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/76359",
            "urlMaterial": "https://youtu.be/MHhOc6XNCZU?si=B8uPywiABlwJi0EU",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 6,
            "title": "Geometría analítica: pendiente de una recta",
            "descripcion": "Video que explica qué es la pendiente de una recta y la importancia de su ángulo de inclinación con el eje x. La tangente del ángulo de inclinación de la recta es su pendiente.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/76371",
            "urlMaterial": "https://youtu.be/C1fsg7WmTCU?si=c_kNqSGHamZ658Db",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 7,
            "title": "Geometría analítica: cónicas",
            "descripcion": "Video de geometría analítica que muestra la relación existente entre las cónicas desde un punto de vista de cortes en un cono con la definición analítica de relaciones entre las distancias de puntos a focos y puntos a directrices.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/76476",
            "urlMaterial": "https://youtu.be/UUcXlBczhkA?si=OdpvTmsnIGkQt1Wp",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 8,
            "title": "Geometría analítica: cónicas [parte 2]",
            "descripcion": "Video que continúa con las construcciones de las esferas de Dandelin para estudiar las definiciones de la hipérbola y de la parábola.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/76477",
            "urlMaterial": "https://youtu.be/DZNX8MOzAqM?si=FIGoEoN8xFmDEYPp",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 9,
            "title": "Geometría analítica: la parábola",
            "descripcion": "Video que explica cómo realizar construcciones de parábolas a partir de algunos de sus elementos. Después, usando GeoLab, a partir de la ecuación general de ella se hallará el parámetro p, la posición del foco y de la directriz",
            "url": "https://rua.unam.mx/portal/recursos/ficha/76608",
            "urlMaterial": "https://youtu.be/58iR_Y0n7Qc?si=Fz1No8gb2URTKXmL",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 10,
            "title": "Ángulo entre 2 rectas con geometría analítica: cómo hallar el ángulo entre dos rectas",
            "descripcion": "Video que muestra cómo calcular el valor del ángulo entre dos rectas que se cruzan en un punto.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/76333",
            "urlMaterial": "https://youtu.be/v5ASD6d9REE?si=maP4Ecqu0qRYGcWD",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 11,
            "title": "Precálculo",
            "descripcion": "Texto que desarrolla las principales propiedades de las funciones cuadráticas y cuenta con ejemplos de aplicaciones: máximos de funciones, reacciones químicas, rapidez. Dirigirse a la página 161 que contiene el capítulo 5.3: Funciones cuadráticas.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/19341",
            "urlMaterial": "http://mat.izt.uam.mx/mat/documentos/notas%20de%20clase/Precalculo.pdf",
            "ubication": "RUA",
            "type": "PDF"
        },
        {
            "id": 12,
            "title": "Problemas verbales de volumen: fracciones y decimales",
            "descripcion": "Interactivo que presenta varios problemas contextuales de volumen que involucran prismas rectangulares. El estudiante debe saber traducir del lenguaje verbal al lenguaje de las matemáticas para hallar la solución.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/19043",
            "urlMaterial": "https://es.khanacademy.org/math/cc-sixth-grade-math/cc-6th-geometry-topic/cc-6th-volume-with-fractions/e/volume-word-problems-with-fractions",
            "ubication": "RUA",
            "type": "web"
        },
        {
            "id": 13,
            "title": "Destreza algebraica",
            "descripcion": "Podcast que destaca la importancia de la disciplina, constancia y práctica para adquirir o desarrollar alguna habilidad y/o destreza. Resalta que, especialmente en el área de las matemáticas, la destreza algebraica es fundamental.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/77929",
            "urlMaterial": "https://rua.unam.mx/recursos/descargar/77929",
            "ubication": "RUA",
            "type": "podcast"
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
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/matematicas1",
            "ubication": "CCH",
            "type": "web"
        },
    ],
    "3": [],
    "2": [
        {
            "id": 1,
            "title": "Análisis e interpretación del poema lírico",
            "descripcion": "Texto que difunde la diversidad de orientaciones en el análisis estructural de poemas.",
            "citaApa": "Ramírez, G. (2011). Helena Beristáin. Análisis e interpretación del poema lírico. México: Universidad Nacional Autónoma de México, 1989. Literatura Mexicana, 2(1), 262-267. https://doi.org/10.19130/iifl.litmex.2.1.1991.41",
            "url": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/41",
            "urlMaterial": "https://revistas-filologicas.unam.mx/literatura-mexicana/index.php/lm/article/view/41",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 2,
            "title": "Investigación documental y bibliográfica",
            "descripcion": "González, A. (1995). El poema como forma literaria. IIFL/UNAM.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/71917",
            "urlMaterial": "https://youtu.be/M7bnWLBARU4?si=7kpBTkSMjUKmyZDD",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 3,
            "title": "La investigación documental y sus herramientas de trabajo",
            "descripcion": "Estudio sobre los recursos poéticos más utilizados en la poesía en lengua española.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/76917",
            "urlMaterial": "https://www.uv.mx/apps/bdh/investigacion/unidad2/index-2.html",
            "ubication": "RUA",
            "type": "web"
        },
        {
            "id": 4,
            "title": "Guía del proceso de investigación documental",
            "descripcion": "Curso sobre la métrica en la poesía española, incluyendo ejercicios y ejemplos prácticos.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/6181",
            "urlMaterial": "nan",
            "ubication": "RUA",
            "type": "PDF"
        },
        {
            "id": 5,
            "title": "Técnicas de investigación",
            "descripcion": "Estudio detallado sobre el soneto, una de las formas poéticas más importantes de la literatura española.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/6177",
            "urlMaterial": "http://profesores.fi-b.unam.mx/jlfl/Seminario_IEE/tecnicas.pdf",
            "ubication": "RUA",
            "type": "PDF"
        },
        {
            "id": 6,
            "title": "TLRIID 1",
            "descripcion": "Análisis de la lírica popular en España y su influencia en la poesía culta.",
            "url": "https://portalacademico.cch.unam.mx/alumno/tlriid1",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/tlriid1",
            "ubication": "CCH",
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
    4: [],
    5: [],
    6: [],
    7: [],
    8: [
        {
            "id": 1,
            "title": "Informática: para cursos de bachillerato",
            "descripcion": "Libro dirigido a alumnos que se asoman por primera vez al mundo de las computadoras, así como a aquellos que quieren reafirmar sus conocimientos.",
            "citaApa": "Ferreyra, G. (2011). Informática: para cursos de bachillerato. Alfaomega.",
            "url": "https://libroweb.alfaomega.com.mx/book/informatica_para_bachillerato_1er",
            "urlMaterial": "https://libroweb.alfaomega.com.mx/book/informatica_para_bachillerato_1er",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 2,
            "title": "Modelos de Computación",
            "descripcion": "Artículo que explica algunos modelos de arquitectura de computadoras.",
            "citaApa": "Patiño Gutiérrez, J. (2013). Modelos de Computación. Universidad Politécnica del Estado de Morelos.",
            "url": "https://www.researchgate.net/publication/262871304_Arquitectura_de_las_computadoras_y_la_computacion_cuantica",
            "urlMaterial": "https://www.researchgate.net/publication/262871304_Arquitectura_de_las_computadoras_y_la_computacion_cuantica",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 3,
            "title": "Software libre vs software propietario",
            "descripcion": "Libro que aborda los conceptos fundamentales del software, el derecho de autor, los tipos de licencias (copyright, copyleft y patentes), así como las ventajas y desventajas del software libre y del software propietario.",
            "citaApa": "Culebro, M., Gómez, W. G., & Torres, S. (2006). Software libre vs software propietario: Ventajas y desventajas. Creative Commons.",
            "url": "https://www.academia.edu/9690867/Software_libre_vs_software_propietario_Ventajas_y_desventajas",
            "urlMaterial": "https://www.academia.edu/9690867/Software_libre_vs_software_propietario_Ventajas_y_desventajas",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 4,
            "title": "Social media marketing, redes sociales y metaversos",
            "descripcion": "Artículo que describe de las redes sociales en Internet, sus características, clasificación, localización, segmentación y uso específico para la publicidad.",
            "citaApa": "Fernández, E. S. M., García, M. L. M., & Jiménez, F. J. B. (2008). Social media marketing, redes sociales y metaversos. En Universidad, Sociedad y Mercados Globales (pp. 353-366).",
            "url": "https://dialnet.unirioja.es/servlet/articulo?codigo=2751765",
            "urlMaterial": "https://dialnet.unirioja.es/servlet/articulo?codigo=2751765",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 5,
            "title": "¿Quieres aprender más sobre el tema Software Libre?",
            "descripcion": "Texto donde se explora qué es un software que no es libre: software privado, freeware, shareware, adware, software privativo y, por último, software comercial.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/19506",
            "urlMaterial": "https://induccion.educatic.unam.mx/mod/book/tool/print/index.php?id=1075&chapterid=488",
            "ubication": "RUA",
            "type": "web"
        },
        {
            "id": 6,
            "title": "El potencial del software libre en la gestión de información en bibliotecas",
            "descripcion": "Artículo expone los fundamentos éticos y tecnológicos que dieron origen al movimiento del software libre, así como la relación que este movimiento guarda con el mundo de las bibliotecas y el manejo de información digital. A su vez presenta algunas de las aplicaciones más populares de software libre que existen para la gestión de información en bibliotecas, a fin de mostrar los alcances y posibilidades que dichas aplicaciones tienen en la creación de sistemas de información a bajo costo, acordes con el ideal de un ciberespacio público.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/8291",
            "urlMaterial": "https://www.paginaspersonales.unam.mx/files/630/Publica_20130111215056.pdf",
            "ubication": "RUA",
            "type": "PDF"
        },
        {
            "id": 7,
            "title": "Paquete Didáctico para Taller de Cómputo",
            "descripcion": "El material que se presenta es un auxiliar en la enseñanza del Taller de cómputo ya que permite que los alumnos trabajen con los materiales seleccionados por el profesor de manera individual, y el trabajo del profesor se centre en corregir y explicar las dudas de concepto o manejo que se presenten en clase, además permite que los alumnos aprendan de acuerdo a su propio ritmo, y que los alumnos más avanzados desarrollen otras secuencias del paquete.",
            "url": "https://portalacademico.cch.unam.mx/recursos-de-apoyo/matematicas/paquete-didactico-para-taller-de-computo",
            "urlMaterial": "https://portalacademico.cch.unam.mx/recursos-de-apoyo/matematicas/paquete-didactico-para-taller-de-computo",
            "ubication": "CCH",
            "type": "web"
        },

    ],
    9: [],
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
