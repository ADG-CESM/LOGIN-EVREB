
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
    "3": [
        {
            "id": 1,
            "title": "Fundamentos de Química",
            "descripcion": "El acceso al texto completo es sólo para usuarios de REDUNAMEl, por  medio de la DGB UNAM.",
            "citaApa": "Burns, R. A. (2017). Fundamentos de Química. (5ª Ed). Pearson/Prentice Hall.",
            "url": "https://research.ebsco.com/c/df24kt/search/details/pcikgdwypf?limiters=&q=Fundamentos%20de%20Qu%C3%ADmica",
            "urlMaterial": "https://research.ebsco.com/c/df24kt/search/details/pcikgdwypf?limiters=&q=Fundamentos%20de%20Qu%C3%ADmica",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 2,
            "title": "La transición hacia el desarrollo sustentable. Perspectivas de América Latina y el Caribe",
            "descripcion": "El libro presenta los análisis, las críticas y las propuestas de los autores sobre el desarrollo sustentable de América Latina y el Caribe.",
            "citaApa": "Leff, E., Ezcurra, E., Pisanty, I., y Romero, P. (2001). La transición hacia el desarrollo sustentable. Perspectivas de América Latina y el Caribe. Semarnat/INE/UAM Xochimilco/PNUMA.",
            "url": "http://140.84.163.2:8080/xmlui/handle/publicaciones/133#:~:text=Este%20libro%20es%20resultado%20de%20un%20ejercicio,no%20habr%C3%A1%20nunca%20de%20conformarse%20con%20el",
            "urlMaterial": "http://140.84.163.2:8080/xmlui/handle/publicaciones/133#:~:text=Este%20libro%20es%20resultado%20de%20un%20ejercicio,no%20habr%C3%A1%20nunca%20de%20conformarse%20con%20el",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 3,
            "title": "Cambio climático: una visión desde México",
            "descripcion": "Libro que describe el cambio climático con bases científicas, presenta las reacciones del mundo ante el problema así como los impactos, vulnerabilidades, y acciones para la adaptación, mitigación y sensibilización.",
            "citaApa": "Martínez, J., Fernández, A. (2004). Cambio climático: una visión desde México. Instituto Nacional de Ecología, Secretaría de Medio Ambiente y Recursos Naturales.",
            "url": "http://www.data.sedema.cdmx.gob.mx/cambioclimaticocdmx/images/biblioteca_cc/Cambio-climatico-una-vision-desde-Mexico-(Julia-Martinez-y-Adrian-Fernandez-Bremauntz-compilado.pdf",
            "urlMaterial": "http://www.data.sedema.cdmx.gob.mx/cambioclimaticocdmx/images/biblioteca_cc/Cambio-climatico-una-vision-desde-Mexico-(Julia-Martinez-y-Adrian-Fernandez-Bremauntz-compilado.pdf",
            "ubication": "Referencias",
            "type": "web"
        },
        {
            "id": 4,
            "title": "Seguridad en el laboratorio",
            "descripcion": "Texto que presenta una introducción sobre los cuidados generales a tener en cuenta para la seguridad en el laboratorio, así como las recomendaciones específicas para la realización de experiencias: materiales y equipamiento eléctrico, sustancias químicas y materiales mecánicos.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/15801",
            "urlMaterial": "http://users.df.uba.ar/acha/Lab5/seguridadgral.htm",
            "ubication": "RUA"
        },
        {
            "id": 5,
            "title": "Reglas de nomenclatura",
            "descripcion": "Texto que muestra las reglas de nomenclatura para nombrar y formar compuestos como óxidos metálicos, óxidos ácidos, hidróxidos, ácidos e hidrácidos.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/17084",
            "urlMaterial": "https://e1.portalacademico.cch.unam.mx/alumno/quimica1/u2/oxigeno_elementos/reglas_nomenclatura",
            "ubication": "RUA"
        },
        {
            "id": 6,
            "title": "Reacción química: definición y ecuación química",
            "descripcion": "En este vídeo se explica qué es una reacción química y cómo se puede representar por medio de una ecuación química.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/85511",
            "urlMaterial": "https://youtu.be/GpKN-uZBZfY?si=6eCmrlc1c6tfOsyT",
            "ubication": "RUA"
        },
        {
            "id": 7,
            "title": "¿Qué son las fórmulas químicas?",
            "descripcion": "Video en el cual se expone la representación de los elementos que forman un compuesto y la proporción en que se encuentran, o del número de átomos que forman una molécula.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/19867",
            "urlMaterial": "https://www.youtube.com/watch?v=rbYK5Ig-oXU",
            "ubication": "RUA"
        },
        {
            "id": 8,
            "title": "Reacciones de síntesis, descomposición y sustitución (parte 1)",
            "descripcion": "Video de química en el cual se presentan ejemplos de reacción de síntesis, descomposición y sustitución simple y doble.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/19842",
            "urlMaterial": "https://www.youtube.com/watch?v=RRcYwTfLRjs&t=304s",
            "ubication": "RUA"
        },
        {
            "id": 9,
            "title": "AACT: American Association of Chemistry Teachers (Simuladores)",
            "descripcion": "Sitio web con simuladores de Química ejecutables vía web de acceso libre para distintos niveles escolares.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/87055",
            "urlMaterial": "https://teachchemistry.org/classroom-resources/simulations",
            "ubication": "RUA"
        },
        {
            "id": 10,
            "title": "Aplicaciones químicas en Biomodel",
            "descripcion": "Sitio web con aplicaciones de Química realizadas con Jmol y JSmol.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/87058",
            "urlMaterial": "https://biomodel.uah.es/quimica/inicio.htm",
            "ubication": "RUA"
        },
        {
            "id": 11,
            "title": "Virtual Lab: Default Virtual Lab Stockroom",
            "descripcion": "Sitio web que proporciona acceso a un laboratorio virtual de Química desarrollado en HTML5.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/87060",
            "urlMaterial": "https://chemcollective.org/vlab/vlab.php",
            "ubication": "RUA"
        },
        {
            "id": 12,
            "title": "CK-12 Exploration Series",
            "descripcion": "Sitio web que ofrece un conjunto de simulaciones para la asignatura de Química y Física.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/87067",
            "urlMaterial": "https://interactives.ck12.org/simulations/chemistry.html",
            "ubication": "RUA"
        },
        {
            "id": 13,
            "title": "Sustancias puras",
            "descripcion": "Recurso que expone los compuestos como sustancias puras de diferentes elementos, identifica los elementos como sustancias puras formadas por el mismo tipo de átomos que no se pueden separar en otras por métodos físicos ni químicos.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/9602",
            "urlMaterial": "http://www.objetos.unam.mx/quimica/sustancias/index.html",
            "ubication": "RUA"
        },
        {
            "id": 14,
            "title": "Tipos de reacciones químicas",
            "descripcion": "Video en el cual se presentan las explicaciones de las diferentes reacciones químicas y la nomenclatura a la que corresponde cada una, así como el desglose de las ecuaciones.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20102",
            "urlMaterial": "https://www.youtube.com/watch?v=X2rT0y2cJ4o",
            "ubication": "RUA"
        },
        {
            "id": 15,
            "title": "Tabla periódica de los elementos",
            "descripcion": "Tabla dinámica de los elementos químicos que permite clasificarlos a través de colores de acuerdo con distintas características.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/86984",
            "urlMaterial": "http://objetos.unam.mx/quimica/tablaPeriodica/",
            "ubication": "RUA"
        },
        {
            "id": 16,
            "title": "¿Qué es el agua?",
            "descripcion": "Artículo en el que se presentan las propiedades químicas y físico-químicas del agua. Se menciona la composición de los elementos del agua y las reacciones que esta tiene con las diferentes sustancias.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/19873",
            "urlMaterial": "https://agua.org.mx/que-es/#propiedades-fisico-quimicas",
            "ubication": "RUA"
        },
        {
            "id": 17,
            "title": "¿Mezcla o compuesto?",
            "descripcion": "Video que presenta los experimentos mediante los cuales quedan demostrados los procesos químicos a través de los que se muestran las diferencias entre mezclas y compuestos.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/19760",
            "urlMaterial": "https://www.youtube.com/watch?v=benJbAVKGVY",
            "ubication": "RUA"
        },
        {
            "id": 18,
            "title": "¿Cuánto sabes de la tabla periódica?",
            "descripcion": "Interactivo que tiene como objetivo que se comprenda la historia de la clasificación de los elementos químicos y ubicar elementos dentro de la tabla periódica a partir de sus propiedades.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/8120",
            "urlMaterial": "http://objetos.unam.mx/quimica/cuantoSabesTablaPeriodica/index.html",
            "ubication": "RUA"
        },
        {
            "id": 19,
            "title": "Balanceo por tanteo (parte 1)",
            "descripcion": "En el video se muestra paso a paso la mejor técnica para dar con los coeficientes correctos en cada compuesto químico.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/85607",
            "urlMaterial": "https://youtu.be/JNOJxkjMaMI?si=pmSbBH89_LOUpanq",
            "ubication": "RUA"
        },
        {
            "id": 20,
            "title": "Balanceo por inspección",
            "descripcion": "Interactivo que expone modelos operativos que representan las reacciones de descomposición (análisis) y síntesis del agua y ejemplos sobre la ley de la conservación de la materia y el balanceo de ecuaciones químicas.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/9604",
            "urlMaterial": "http://www.objetos.unam.mx/quimica/balanceoEcuaciones/index.html",
            "ubication": "RUA"
        },
        {
            "id": 21,
            "title": "Modelos atómicos",
            "descripcion": "Lección interactiva en la que se muestra cómo el descubrimiento de las partículas subatómicas dio origen a los diferentes modelos atómicos hasta el modelo de Bohr.",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/alumno/quimica1/u2/modelos_atomicos/modelosatomicos",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/quimica1/u2/modelos_atomicos/modelosatomicos",
            "ubication": "CCH"
        },
        {
            "id": 22,
            "title": "Química 1",
            "descripcion": "Lección interactiva que ayuda a comprender fenómenos y procesos de la naturaleza que ocurren en su entorno y las relaciones con la ciencia química.",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/alumno/quimica1",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/quimica1",
            "ubication": "CCH"
        },
        {
            "id": 23,
            "title": "Agua: compuesto o elemento",
            "descripcion": "Lección interactiva en la que se muestran las reacciones de análisis y de síntesis del agua mediante la elaboración de modelos operativos representativos del agua, oxígeno e hidrógeno. También ayuda a comprender los conceptos de elemento, compuesto, átomo, molécula, enlace, mezcla y reacción química.",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/alumno/quimica1/unidad1/agua-compuesto-o-elemento",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/quimica1/unidad1/agua-compuesto-o-elemento",
            "ubication": "CCH"
        },
        {
            "id": 24,
            "title": "Combustión",
            "descripcion": "Material que muestra las propiedades de los compuestos orgánicos e inorgánicos para distinguirlos entre sí y diferenciar las reacciones endotérmicas y exotérmicas, para comprender sus aplicaciones en la generación de energía.",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/alumno/quimica1/unidad2/combustion",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/quimica1/unidad2/combustion",
            "ubication": "CCH"
        },
        {
            "id": 25,
            "title": "Reacciones químicas",
            "descripcion": "Material que muestra las diferencias entre un cambio físico y un cambio químico con base en la identificación y diferenciación entre los elementos y los compuestos, reconociendo las reacciones químicas endotérmicas y exotérmicas como procesos en donde se transforman unas sustancias en otras.",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/alumno/quimica1/unidad1/reaccionesQuimicas",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/quimica1/unidad1/reaccionesQuimicas",
            "ubication": "CCH"
        },
        {
            "id": 26,
            "title": "Tipos de enlace",
            "descripcion": "Lección interactiva que ayuda a identificar qué tipo de enlace químico se forma a través del estudio de las electronegatividades de los elementos involucrados en cada compuesto.",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/alumno/quimica1/unidad2/tiposdeenlaces",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/quimica1/unidad2/tiposdeenlaces",
            "ubication": "CCH"
        },
        {
            "id": 27,
            "title": "Oxígeno sobre elementos",
            "descripcion": "Lección interactiva en la que se conocerá cómo interactúa el oxígeno ante los metales y no metales para la formación de hidróxidos y ácidos.",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/alumno/quimica1/u2/oxigeno_elementos",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/quimica1/u2/oxigeno_elementos",
            "ubication": "CCH"
        }
    ],
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
            "descripcion": "Video que explica cuál es el propósito de la investigación documental y de la investigación bibliográfica, en qué áreas de estudio intervienen, qué tipo de archivos, documentos o materiales manejan.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/71917",
            "urlMaterial": "https://youtu.be/M7bnWLBARU4?si=7kpBTkSMjUKmyZDD",
            "ubication": "RUA",
            "type": "video"
        },
        {
            "id": 3,
            "title": "La investigación documental y sus herramientas de trabajo",
            "descripcion": "Lección en la que se abordan diversos temas que hacen referencia a los pasos a seguir para llevar a cabo una investigación.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/76917",
            "urlMaterial": "https://www.uv.mx/apps/bdh/investigacion/unidad2/index-2.html",
            "ubication": "RUA",
            "type": "web"
        },
        {
            "id": 4,
            "title": "Guía del proceso de investigación documental",
            "descripcion": "Esta guía elaborada por el Dr. Juan Luis Francois Lacoutre te ayudará en tu proceso de investigación documental a: elegir el tema de investigación, delimitar el tema, plantear el problema así como llevar el control de tus fuentes de información.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/6181",
            "urlMaterial": "http://profesores.fi-b.unam.mx/jlfl/Seminario_IEE/Guia_Inv_Documental.pdf",
            "ubication": "RUA",
            "type": "PDF"
        },
        {
            "id": 5,
            "title": "Técnicas de investigación",
            "descripcion": "Este documento describe las técnicas de la investigación documental y de campo con el propósito de auxiliar al alumno en su investigación. Este material fue desarrollado para el Seminario de Ingeniería Eléctrica Electrónica por la Facultad de Ingeniería de la UNAM.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/6177",
            "urlMaterial": "http://profesores.fi-b.unam.mx/jlfl/Seminario_IEE/tecnicas.pdf",
            "ubication": "RUA",
            "type": "PDF"
        },
        {
            "id": 6,
            "title": "TLRIID 1",
            "descripcion": "Los Objetos de Aprendizaje para desarrollar la competencia comunicativa en torno a la lectura, la escritura, la escucha, el habla, la investigación y la literatura",
            "url": "https://portalacademico.cch.unam.mx/alumno/tlriid1",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/tlriid1",
            "ubication": "CCH",
            "type": "web"
        },
        {
            "id": 7,
            "title": "TLRIID 2",
            "descripcion": "Los Objetos de Aprendizaje para desarrollar la competencia comunicativa en torno a la lectura, la escritura, la escucha, el habla, la investigación y la literatura",
            "url": "https://portalacademico.cch.unam.mx/alumno/tlriid2",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/tlriid2",
            "ubication": "CCH",
            "type": "web"
        }
    ],
    4: [
        {
            "id": 1,
            "title": "Transición a la sociedad capitalista: las revoluciones burguesas (siglo XVI a principios del XIX)",
            "descripcion": "Video que describe los temas de la unidad 3 de Historia Universal Moderna y Contemporánea I. ",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/2661",
            "urlMaterial": "https://www.youtube.com/watch?v=14VF5cfq5cY",
            "ubication": "RUA"
        },
        {
            "id": 2,
            "title": "Historia Universal Moderna y Contemporánea 1",
            "descripcion": "Lección para reflexionar, problematizar y analizar los procesos sociales, económicos, políticos y culturales de la humanidad en su desarrollo histórico.",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/alumno/historiauniversal1",
            "urlMaterial": "https://portalacademico.cch.unam.mx/alumno/historiauniversal1",
            "ubication": "CCH"
        },
        {
            "id": 3,
            "title": "Unidad I: Introducción al estudio de la Historia",
            "descripcion": "Sitio web con resúmenes, materiales y ejercicios de autoevaluación. ",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/repositorio-de-sitios/historico-social/historia-universal-1/HUMCI/HUI-1.htm",
            "urlMaterial": "https://portalacademico.cch.unam.mx/repositorio-de-sitios/historico-social/historia-universal-1/HUMCI/HUI-1.htm",
            "ubication": "CCH"
        },
        {
            "id": 4,
            "title": "Unidad II: El Feudalismo",
            "descripcion": "Sitio web con resúmenes, videos y ejercicios de autoevaluación. ",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/repositorio-de-sitios/historico-social/historia-universal-1/HUMCI/HUI-2.htm",
            "urlMaterial": "https://portalacademico.cch.unam.mx/repositorio-de-sitios/historico-social/historia-universal-1/HUMCI/HUI-2.htm",
            "ubication": "CCH"
        },
        {
            "id": 5,
            "title": "Unidad III: Transición a la sociedad capitalista",
            "descripcion": "Sitio web con resúmenes, videos y ejercicios de autoevaluación. ",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/repositorio-de-sitios/historico-social/historia-universal-1/HUMCI/HUI-3.htm",
            "urlMaterial": "https://portalacademico.cch.unam.mx/repositorio-de-sitios/historico-social/historia-universal-1/HUMCI/HUI-3.htm",
            "ubication": "CCH"
        },
        {
            "id": 6,
            "title": "Unidad IV: Auge del capitalismo de libre competencia y presencia del movimiento obrero",
            "descripcion": "Sitio web con resúmenes, videos y ejercicios de autoevaluación. ",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/repositorio-de-sitios/historico-social/historia-universal-1/HUMCI/HUI-4.htm",
            "urlMaterial": "https://portalacademico.cch.unam.mx/repositorio-de-sitios/historico-social/historia-universal-1/HUMCI/HUI-4.htm",
            "ubication": "CCH"
        }
    ],
    5: [
        {
            "id": 1,
            "title": "Una mirada al feminicidio",
            "descripcion": "Reseña que presenta una reflexión sobre la intervención de los medios de comunicación y su contribución a la expansión de violencia feminicida en México.",
            "citaApa": "Angulo Menasse, A. (2018). Una mirada al feminicidio, Mariana Berlanga. Editorial Ítaca, Universidad Autónoma de la Ciudad de México. 256 p. Investigaciones Feministas, 9(2), 345-346. https://doi.org/10.5209/INFE.60651",
            "type": "web",
            "url": "https://revistas.ucm.es/index.php/INFE/article/view/60651",
            "urlMaterial": "https://revistas.ucm.es/index.php/INFE/article/view/60651",
            "ubication": "Referencias"
        },
        {
            "id": 2,
            "title": "Avances sociales sustentables: la igualdad de género",
            "descripcion": "El artículo afirma que las modificaciones especiales a la experiencia vital humana que han tenido lugar en las generaciones más recientes (disponibilidad de energía, alimentación, movilidad, esperanza de vida, etcétera) han estado acompañadas de adecuaciones inaplazables a inequidades históricas.",
            "type": "PDF",
            "url": "https://rua.unam.mx/portal/recursos/ficha/5376",
            "urlMaterial": "https://www.revista.unam.mx/vol.14/num10/art39/",
            "ubication": "RUA"
        },
        {
            "id": 3,
            "title": "La agenda política y sociocultural para la equidad de género",
            "descripcion": "Video que explica las acciones emprendidas en materia de equidad de género en el ámbito universitario y reflexiona sobre las acciones que falta reforzar para poner en la agenda pública estrategias que posibiliten la igualdad de género.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/5756",
            "urlMaterial": "https://mediacampus.cuaed.unam.mx/node/4354",
            "ubication": "RUA"
        },
        {
            "id": 4,
            "title": "La evolución del acceso a la educación por géneros en México",
            "descripcion": "En el artículo se analiza, desde la perspectiva de género, el estado que guarda la educación en México, y si existe igualdad de oportunidades educativas entre géneros y condición de pobreza.",
            "type": "PDF",
            "url": "https://rua.unam.mx/portal/recursos/ficha/5717",
            "urlMaterial": "https://www.revista.unam.mx/vol.9/num12/art101/art101.pdf",
            "ubication": "RUA"
        },
        {
            "id": 5,
            "title": "¿Cómo entendemos la equidad de género?",
            "descripcion": "Video que tiene como objetivo analizar el concepto de género entendido como una categoría social, pero también como una estructura de poder, en donde existe una subordinación y desvalorización de la mujer.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/5720",
            "urlMaterial": "https://mediacampus.cuaed.unam.mx/node/4302",
            "ubication": "RUA"
        },
        {
            "id": 6,
            "title": "Ley General para la Igualdad entre Mujeres y Hombres",
            "descripcion": "Sitio web de la Cámara de Diputados, en el que se encuentra la Ley General para la Igualdad entre Mujeres y Hombres, con sus decretos de reforma desde su publicación a la fecha.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/16693",
            "urlMaterial": "https://www.diputados.gob.mx/LeyesBiblio/ref/lgimh.htm",
            "ubication": "RUA"
        },
        {
            "id": 7,
            "title": "Guía de estudio para el examen extraordinario de la asignatura igualdad de género",
            "descripcion": "La guía contiene la presentación de cada unidad del programa académico, actividades de aprendizaje, formas de autoevaluación, un examen modelo y bibliografía.",
            "type": "PDF",
            "url": "https://portalacademico.cch.unam.mx/recursos-de-apoyo/guia-para-examen-extraordinario/igualdad-genero",
            "urlMaterial": "https://portalacademico.cch.unam.mx/sites/default/files/2025-02/guia-extraordinario-igualdad-genero.pdf",
            "ubication": "CCH"
        }
    ],
    6: [],
    7: [
        {
            "id": 1,
            "title": "Guía de estudio para el examen extraordinario de inglés I: CCH",
            "descripcion": "Guía diseñada para adquierir los conocimientos y habilidades necesarias para acreditar el examen extraordinario correspondiente al semestre I del programa de inglés de cuatro habilidades del Colegio de Ciencias y Humanidades.",
            "type": "PDF",
            "url": "https://rua.unam.mx/portal/recursos/ficha/5627",
            "urlMaterial": "https://www.cchazc.unam.mx/wp-content/uploads/2013/03/GuiaIngles.pdf",
            "ubication": "RUA"
        },
        {
            "id": 2,
            "title": "Inglés: vocabulario de la familia y los amigos (relaciones personales)",
            "descripcion": "Video que presenta el vocabulario relacionado con la familia en inglés.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20875",
            "urlMaterial": "https://www.youtube.com/watch?v=wdPdBOfoJ1w",
            "ubication": "RUA"
        },
        {
            "id": 3,
            "title": "Aprender inglés: la casa y las direcciones",
            "descripcion": "Video donde se muestra el uso del verbo \"to be\" para describir la ubicación de muebles, cuartos y demás cosas en un sitio en particular.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/17121",
            "urlMaterial": "https://www.youtube.com/watch?v=PTgqVS4KyrU",
            "ubication": "RUA"
        },
        {
            "id": 4,
            "title": "Vocabulario inglés: partes de la ciudad (parts of the city)",
            "descripcion": "Video en el que encontramos un vocabulario en inglés con distintas partes de una ciudad, además de la pronunciación de cada una de las palabras.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/17812",
            "urlMaterial": "https://www.youtube.com/watch?v=m78swhrdKcg",
            "ubication": "RUA"
        },
        {
            "id": 5,
            "title": "Aprende inglés: las prendas de ropa y accesorios",
            "descripcion": "Video que contiene vocabulario en inglés de las prendas de ropa y accesorios.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20866",
            "urlMaterial": "https://www.youtube.com/watch?v=CdLW5t_akl8",
            "ubication": "RUA"
        },
        {
            "id": 6,
            "title": "Vocabulario inglés: esparcimiento y pasatiempos (recreation & hobbies)",
            "descripcion": "Video que contiene vocabulario en inglés de \"hobbies\" y pasatiempos.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20888",
            "urlMaterial": "https://www.youtube.com/watch?v=UrGjGXfqJyA",
            "ubication": "RUA"
        },
        /*{
            "id": 7,
            "title": "Gandhi Katha [inglés]",
            "descripcion": "Podcast que reproduce la versión original (en inglés) del curso \"Gandhi Katha\", donde Narayan Desai va tejiendo recuerdos y enseñanzas que describen la historia de vida de Bapu, como le llamaba la gente a Gandhi, junto con piezas musicales que hablan de valores como la paz y el amor.",
            "type": "Podcast",
            "url": "https://rua.unam.mx/portal/recursos/ficha/15304",
            "urlMaterial": "https://descargacultura.unam.mx/3507808?sharedItem=3507808",
            "ubication": "RUA"
        },*/
        {
            "id": 8,
            "title": "Cognados (español/inglés)",
            "descripcion": "Video que enseña el concepto de cognados mediante ejemplos y la historia de cómo se crearon.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/16953",
            "urlMaterial": "https://www.youtube.com/watch?v=8Ne0oOiwXYk",
            "ubication": "RUA"
        },
        {
            "id": 9,
            "title": "Vocabulario en inglés: verbos y adjetivos para describir la apariencia física",
            "descripcion": "Video que explica cómo utilizar los verbos y adjetivos en inglés para describir la apariencia física de una persona.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/16970",
            "urlMaterial": "https://www.youtube.com/watch?v=LvYHoaxH0v0",
            "ubication": "RUA"
        },
        {
            "id": 10,
            "title": "El imperativo en inglés con explicación y ejemplos",
            "descripcion": "Video de una lección sobre el uso del imperativo en inglés, la cual es explicada mediante ejemplos que muestran su escritura y pronunciación.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/16979",
            "urlMaterial": "https://www.youtube.com/watch?v=mxxTylnpzNA",
            "ubication": "RUA"
        },
        {
            "id": 11,
            "title": "Conversaciones en inglés: gustos y preferencias",
            "descripcion": "Video que muestra varios ejemplos de frases utilizadas para demostrar gustos y preferencias en una conversación en inglés.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/16986",
            "urlMaterial": "https://www.youtube.com/watch?v=DZMAtPNSsRs",
            "ubication": "RUA"
        },
        /* {
             "id": 12,
             "title": "Profesiones en inglés",
             "descripcion": "Audio de una lección de un curso básico sobre las profesiones en inglés.",
             "type": "Podcast",
             "url": "https://rua.unam.mx/portal/recursos/ficha/16990",
             "urlMaterial": "https://archive.org/details/DawayPodcastBasico006",
             "ubication": "RUA"
         },*/
        {
            "id": 13,
            "title": "La frase nominal del inglés",
            "descripcion": "Texto que presenta la descripción de la frase nominal en el idioma inglés, desde el punto de vista léxico-gramatical. Además incluye un video que explica detalladamente estas características.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/18873",
            "urlMaterial": "https://oercommons.org/authoring/4257-la-frase-nominal-del-ingl%C3%A9s/view",
            "ubication": "RUA"
        },
        {
            "id": 14,
            "title": "Preposiciones de lugar en inglés y ejemplos",
            "descripcion": "Blog que explica el uso del verbo de las preposiciones de lugar en inglés. Contiene ejemplos para reforzar el aprendizaje.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20689",
            "urlMaterial": "https://blogpara-aprenderingles.blogspot.com/2012/08/preposiciones-de-lugar-en-ingles-y.html",
            "ubication": "RUA"
        },
        {
            "id": 15,
            "title": "Estados de ánimo en inglés",
            "descripcion": "Blog que contiene videos con los cuales se explica vocabulario útil para expresar los estados de ánimo de las personas. Anexa una lista de las emociones más comunes.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20702",
            "urlMaterial": "https://vocabulariodeingles.blogspot.com/2011/05/vocabulario-emociones-emotions.html",
            "ubication": "RUA"
        },
        {
            "id": 16,
            "title": "Frases nominales en inglés",
            "descripcion": "Blog que explica los elementos y formas de las frases nominales en inglés. Contiene ejemplos para reforzar el aprendizaje.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20715",
            "urlMaterial": "https://pnfcc.blogspot.com/2014/07/frasesv-nominales-en-ingles.html",
            "ubication": "RUA"
        },
        {
            "id": 17,
            "title": "Vocabulario en inglés: adjetivos para describir la personalidad",
            "descripcion": "Video que presenta algunos de los adjetivos más utilizados para describir la personalidad de alguien, así como algunos sufijos (dis-, im-, in-, ir-, un-) para formar adjetivos que expresan cualidades negativas.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20861",
            "urlMaterial": "https://www.youtube.com/watch?v=1_SvNekOIG8",
            "ubication": "RUA"
        },
        {
            "id": 18,
            "title": "El alfabeto en inglés",
            "descripcion": "Video que repasa el nombre de las letras en inglés, junto con el sonido que corresponde a cada letra.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20862",
            "urlMaterial": "https://www.youtube.com/watch?v=3oOmMqsPbC0",
            "ubication": "RUA"
        },
        {
            "id": 19,
            "title": "El alfabeto: abecedario en inglés",
            "descripcion": "Video del abecedario en inglés con la pronunciación de cada letra.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20892",
            "urlMaterial": "https://www.youtube.com/watch?v=-zeC0xRB8kk",
            "ubication": "RUA"
        },
        {
            "id": 20,
            "title": "Aprende en inglés las partes del cuerpo",
            "descripcion": "Video que contiene vocabulario en inglés de las partes del cuerpo. Ayuda para aprender y repasar la pronunciación.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20868",
            "urlMaterial": "https://www.youtube.com/watch?v=iwhmRExBWig",
            "ubication": "RUA"
        },
        {
            "id": 21,
            "title": "El plural en inglés: sustantivos",
            "descripcion": "Video que explica el plural de los sustantivos en inglés. Contiene ejemplos para formar los plurales.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20873",
            "urlMaterial": "https://www.youtube.com/watch?v=slcuFaRoa3s",
            "ubication": "RUA"
        },
        {
            "id": 22,
            "title": "Vocabulario y expresiones en inglés para hablar de nuestros hobbies y aficiones",
            "descripcion": "Video que muestra vocabulario relacionado con los hobbies y las aficiones. También explica algunas de las expresiones y estructuras más comunes para hablar de lo que nos gusta hacer en nuestro tiempo libre.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20881",
            "urlMaterial": "https://www.youtube.com/watch?v=DYtqymt-dDg",
            "ubication": "RUA"
        },
        {
            "id": 23,
            "title": "El artículo indefinido en inglés \"a\", \"an\" (un, una, unos, unas)",
            "descripcion": "Video que explica cómo usar el artículo indefinido o indeterminado en inglés \"a\", \"an\" (un, una, unos, unas).",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20882",
            "urlMaterial": "https://www.youtube.com/watch?v=hg9FcAz7-ag",
            "ubication": "RUA"
        },
        {
            "id": 24,
            "title": "Aprende en inglés los miembros de la familia",
            "descripcion": "Video que expone el vocabulario de la familia en inglés.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20884",
            "urlMaterial": "https://www.youtube.com/watch?v=MN38RS5f3Cg",
            "ubication": "RUA"
        },
        {
            "id": 25,
            "title": "Cómo presentarse en inglés: presentaciones",
            "descripcion": "Video que explica cómo presentarte y a presentar a los amigos y conocidos. Contiene ejemplos en diferentes situaciones.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20885",
            "urlMaterial": "https://www.youtube.com/watch?v=njAo96hVrZ4",
            "ubication": "RUA"
        },
        {
            "id": 26,
            "title": "There is/there are: describir lugares en inglés",
            "descripcion": "Video que muestra cómo usar las expresiones \"there is\" y \"there are\" para mencionar las cosas que hay en lugares como la casa, habitación u oficina.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/17119",
            "urlMaterial": "https://www.youtube.com/watch?v=yZzU87S-IJ8",
            "ubication": "RUA"
        },
        {
            "id": 27,
            "title": "6 frases para aceptar invitación en inglés",
            "descripcion": "Blog que muestra seis frases para aceptar una invitación en inglés. Contiene ejemplos para saber utilizar las frases.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20691",
            "urlMaterial": "https://blogpara-aprenderingles.blogspot.com/2015/06/6-frases-para-aceptar-invitacion-en.html",
            "ubication": "RUA"
        },
        {
            "id": 28,
            "title": "Preguntas de información personal en inglés",
            "descripcion": "Blog que explica las preguntas de información personal en inglés utilizadas en diferentes contextos.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20701",
            "urlMaterial": "https://tuinglesya.blogspot.com/2015/03/preguntas-de-informacion-personal-en.html",
            "ubication": "RUA"
        },
        {
            "id": 29,
            "title": "Miembros de la familia en inglés",
            "descripcion": "Video que presenta el vocabulario de los miembros de la familia en inglés.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20864",
            "urlMaterial": "https://www.youtube.com/watch?v=9O9uWq0Ppc8",
            "ubication": "RUA"
        },
        {
            "id": 30,
            "title": "Cómo describir a una persona en inglés: verbos, adverbios y expresiones más comunes",
            "descripcion": "Video que explica cómo utilizar los verbos, los adverbios y las expresiones más comunes para describir a una persona en inglés.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20871",
            "urlMaterial": "https://www.youtube.com/watch?v=pfJ3TLg0g48",
            "ubication": "RUA"
        },
        {
            "id": 31,
            "title": "Los sustantivos singulares y plurales en inglés",
            "descripcion": "Video que explica los sustantivos singulares y plurales en inglés. Contiene ejemplos para reforzar el aprendizaje.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20876",
            "urlMaterial": "https://www.youtube.com/watch?v=wfdCG9QvVp8",
            "ubication": "RUA"
        },
        {
            "id": 32,
            "title": "Saludarse, despedirse y presentarse en inglés",
            "descripcion": "Sitio web que presenta frases utilizadas para saludar y despedirse, para responder a un saludo, presentar a dos personas y entablar una pequeña conversación.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/16989",
            "urlMaterial": "https://linguing.es/viajes-de-idiomas/saludarse-despedirse-y-presentarse-en-ingles/",
            "ubication": "RUA"
        },
        {
            "id": 33,
            "title": "Los adjetivos posesivos, los pronombres posesivos y el caso posesivo en inglés",
            "descripcion": "Video que explica cómo usar los adjetivos posesivos, los pronombres posesivos y el caso posesivo (caso genitivo o genitivo sajón) en inglés.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20869",
            "urlMaterial": "https://www.youtube.com/watch?v=jM-ecOKWjsA",
            "ubication": "RUA"
        },
        {
            "id": 34,
            "title": "Listen and learn: relaciones familiares (family relationships)",
            "descripcion": "Interactivo diseñado para reconocer las diferentes relaciones entre familiares; hablar de sus ocupaciones y de sus posesiones; y describir su apariencia física y personalidad, así como la de otras personas.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/14156",
            "urlMaterial": "http://objetos.unam.mx/ingles/listenLearnUnit2/index.html",
            "ubication": "RUA"
        },
        {
            "id": 35,
            "title": "La casa y el mobiliario",
            "descripcion": "Ejercicios de vocabulario interactivos en inglés y español sobre partes de la casa, habitaciones, utensilios y mobiliario.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/18863",
            "urlMaterial": "https://www.aprenderespanol.org/vocabulario/casa-mobiliario.html",
            "ubication": "RUA"
        },
        {
            "id": 36,
            "title": "Posesivo anglosajón",
            "descripcion": "Blog que explica el posesivo anglosajón en inglés. Contiene ejercicios para reforzar el conocimiento.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20680",
            "urlMaterial": "https://unefainglesiiijfd.blogspot.com/2011/04/posesivo-anglosajon.html",
            "ubication": "RUA"
        },
        {
            "id": 37,
            "title": "Adjetivos calificativos: tamaños y medidas",
            "descripcion": "Blog que muestra los adjetivos calificativos en inglés de tamaños y medidas. Contiene ejemplos.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20688",
            "urlMaterial": "https://blogpara-aprenderingles.blogspot.com/2012/08/adjetivos-calificativos-tamanos-y.html",
            "ubication": "RUA"
        },
        {
            "id": 38,
            "title": "Vocabulario: physical appearance",
            "descripcion": "Video que presenta vocabulario en inglés relacionado con la apariencia física.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20867",
            "urlMaterial": "https://www.youtube.com/watch?v=G5QgqZvili0",
            "ubication": "RUA"
        },
        {
            "id": 39,
            "title": "La familia",
            "descripcion": "Video que presenta vocabulario en inglés acerca de los miembros de la familia. Contiene audio para reforzar el aprendizaje.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20874",
            "urlMaterial": "https://www.youtube.com/watch?v=VBpvWIe4BNM",
            "ubication": "RUA"
        },
        {
            "id": 40,
            "title": "Personal titles (títulos personales)",
            "descripcion": "Video que presenta vocabulario en inglés acerca de los títulos personales.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20883",
            "urlMaterial": "https://www.youtube.com/watch?v=hZDdtoKlxvI&t=4s",
            "ubication": "RUA"
        },
        {
            "id": 41,
            "title": "The genitive (el genitivo sajón)",
            "descripcion": "Blog que explica el genitivo sajón en el idioma inglés. Contiene ejemplos y ejercicios para reforzar el aprendizaje.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20697",
            "urlMaterial": "https://elblogdelingles.blogspot.com/2007/02/lesson-36-genitive-el-genitivo-sajn.html",
            "ubication": "RUA"
        },
        {
            "id": 42,
            "title": "Question words in english",
            "descripcion": "Blog que explica las palabras de preguntas en inglés. Contiene ejemplos para reforzar el aprendizaje.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20705",
            "urlMaterial": "https://www.grammar.cl/Notes/Question_Words.htm",
            "ubication": "RUA"
        },
        {
            "id": 43,
            "title": "Artículo indeterminado: a, an",
            "descripcion": "Sitio web que explica el artículo indeterminado en inglés.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20823",
            "urlMaterial": "https://www.aprenderinglesfacil.es/2008/03/artculo-indeterminado-an.html",
            "ubication": "RUA"
        },
        {
            "id": 44,
            "title": "Gramática inglesa: ¿quién?, ¿por qué?",
            "descripcion": "Sitio web que explica las diferencias entre \"who\" y \"whose\" en inglés. Contiene ejercicios.",
            "type": "WEB",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20829",
            "urlMaterial": "https://www.languageguide.org/english/grammar/esp/part1/who.jsp",
            "ubication": "RUA"
        },
        {
            "id": 45,
            "title": "Who, what, where, when, why, how",
            "descripcion": "Video que explica las palabras para formular preguntas en inglés. Contiene ejemplos para facilitar el aprendizaje.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20877",
            "urlMaterial": "https://www.youtube.com/watch?v=2lEErH_rNBQ",
            "ubication": "RUA"
        },
        {
            "id": 46,
            "title": "Genitivo sajón",
            "descripcion": "Video que explica con ejemplos el genitivo sajón en inglés.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20886",
            "urlMaterial": "https://www.youtube.com/watch?v=SIuvbhqa9SA",
            "ubication": "RUA"
        },
        {
            "id": 47,
            "title": "Describing things part 3",
            "descripcion": "Video en el que se explica cómo usar adjetivos para describir cosas en inglés, con características como el tamaño y el material.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/17808",
            "urlMaterial": "https://www.youtube.com/watch?v=fT2VCpfafrg",
            "ubication": "RUA"
        },
        {
            "id": 48,
            "title": "Pronombres y adjetivos: demostrativos",
            "descripcion": "Video que explica qué son los pronombres y adjetivos demostrativos y cómo usarlos en inglés.",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/20879",
            "urlMaterial": "https://www.youtube.com/watch?v=8jBE_GrlFKU",
            "ubication": "RUA"
        },
        {
            "id": 49,
            "title": "Likes and dislikes",
            "descripcion": "Video donde se muestra la estructura de las oraciones usadas para expresar gustos y disgustos, utilizando los verbos \"like\", \"love\" y \"hate\".",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/17199",
            "urlMaterial": "https://www.youtube.com/watch?v=G5jSzCtEkhQ",
            "ubication": "RUA"
        },
        {
            "id": 50,
            "title": "Likes & dislikes: expresar preferencias",
            "descripcion": "Video donde se muestra la estructura de las oraciones para expresar gustos y disgustos, utilizando los verbos \"like\", \"love\" y \"hate\".",
            "type": "Video",
            "url": "https://rua.unam.mx/portal/recursos/ficha/17200",
            "urlMaterial": "https://www.youtube.com/watch?v=COWxgkNNVho",
            "ubication": "RUA"
        },
        {
            "id": 51,
            "title": "Inglés 1",
            "descripcion": "Lección orientada a la comprensión de textos sencillos, orales y escritos de un ámbito personal y académico en el idioma inglés.",
            "type": "WEB",
            "url": "https://portalacademico.cch.unam.mx/ingles1",
            "urlMaterial": "https://portalacademico.cch.unam.mx/ingles1",
            "ubication": "CCH"
        }
    ]
    ,
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
            "descripcion": "Artículo que expone los fundamentos éticos y tecnológicos que dieron origen al movimiento del software libre, así como la relación que este movimiento guarda con el mundo de las bibliotecas y el manejo de información digital.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/8291",
            "urlMaterial": "https://www.paginaspersonales.unam.mx/files/630/Publica_20130111215056.pdf",
            "ubication": "RUA",
            "type": "PDF"
        },
        {
            "id": 7,
            "title": "Paquete Didáctico para Taller de Cómputo",
            "descripcion": "El material que se presenta es un auxiliar en la enseñanza del Taller de cómputo ya que permite que los alumnos trabajen con los materiales seleccionados por el profesor de manera individual.",
            "url": "https://portalacademico.cch.unam.mx/recursos-de-apoyo/matematicas/paquete-didactico-para-taller-de-computo",
            "urlMaterial": "https://portalacademico.cch.unam.mx/recursos-de-apoyo/matematicas/paquete-didactico-para-taller-de-computo",
            "ubication": "CCH",
            "type": "web"
        },

    ],
    9: [
        {
            "id": 1,
            "title": "Biología. La unidad y diversidad de la vida.",
            "descripcion": "Libro para lectura en línea o descarga de las primeras 100 páginas, en formato PDF.",
            "citaApa": "Starr, C. et al. (2018). Biología. La unidad y diversidad de la vida. Cengage Learning, 13a. ed. ProQuest Ebook Central. https://ebookcentral.proquest.com/lib/unam/detail.action?docID=5756580.",
            "url": "https://ebookcentral.proquest.com/lib/unam/detail.action?docID=5756580",
            "urlMaterial": "https://ebookcentral.proquest.com/lib/unam/detail.action?docID=5756580",
            "ubication": "Referencias",
            "type": "WEB"
        },
        {
            "id": 2,
            "title": "Departamento de Educación Física",
            "descripcion": "Sitio web del Departamento de Educación Física del Colegio de Ciencias y Humanidades de la UNAM.",
            "url": "https://rua.unam.mx/portal/recursos/ficha/19311",
            "urlMaterial": "hhttps://www.cch.unam.mx/academica/?q=depef",
            "ubication": "RUA",
            "type": "WEB"
        },
        {
            "id": 3,
            "title": "Introducción a la educación física",
            "descripcion": "Video que contiene conceptos relacionados con educación física.",
            "url": "https://portalacademico.cch.unam.mx/recursos-de-apoyo/video-educativo/introduccion-la-educacion-fisica",
            "urlMaterial": "https://www.youtube.com/watch?v=qxgKwAAvhp4",
            "ubication": "CCH",
            "type": "video"
        },

    ]
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
        <div className="h-[calc(100vh-87.5px)] sm:h-[calc(100vh-87.25px)] overflow-hidden flex flex-col pt-20">
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
