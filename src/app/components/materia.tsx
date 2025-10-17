import React from 'react';
import Image from 'next/image';
import { Descripcion } from './description';

interface MateriaProps {
    id: string;
    title: string;
    url: string;
    urlMaterial: string;
    type: string;
    ubication: string;
    descripcion?: string;

    isSelected?: boolean;
    onClick?: () => void;
}

export function MateriaCard({
    title,
    url,
    urlMaterial,
    type,
    ubication,
    descripcion,
    isSelected = false,
    onClick
}: MateriaProps) {
    const lowerType = type.toLowerCase();
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        }
    };

    return (
        <div
            role='button'
            tabIndex={0}
            aria-pressed={isSelected}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            className={`relative group p-3 sm:p-4 w-full sm:w-[260px] h-[240px] sm:h-[260px] min-w-0 rounded-2xl border border-indigo-100/70 bg-gradient-to-br from-indigo-100 to-blue-100 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${isSelected ? 'ring-2 ring-indigo-300 shadow-md' : ''}`}>

            {/* Overlay Descripcion: focus en móviles (sm:hidden), hover en escritorio (sm:block) */}
            {/* Móvil: aparece al enfocar el card o sus hijos */}
            <div className="absolute inset-0 z-20 opacity-0 pointer-events-none transition-opacity duration-200 block sm:hidden group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
                <div className="h-full">
                    <Descripcion
                        descripcion={descripcion ?? title}
                        url={url}
                        urlMaterial={urlMaterial}
                        ubication={ubication}
                        title={title}
                    />
                </div>
            </div>
            {/* Escritorio y tablets (>= sm): aparece al hover */}
            <div className="absolute inset-0 z-20 opacity-0 pointer-events-none transition-opacity duration-200 hidden sm:block sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto">
                <div className="h-full">
                    <Descripcion
                        descripcion={descripcion ?? title}
                        url={url}
                        urlMaterial={urlMaterial}
                        ubication={ubication}
                        title={title}
                    />
                </div>
            </div>

            {/* Imagen/preview */}
            <div className="w-full overflow-hidden rounded-xl flex-shrink-0 border border-white/60 bg-white/60 shadow-inner">
                <Image
                    src={
                        lowerType === "video"
                            ? "/evreb/video.svg"
                            : lowerType === "pdf"
                                ? "/evreb/doc2.svg"
                                : "/evreb/web.svg"
                    }
                    alt={title}
                    width={600}
                    height={200}
                    className="w-full h-28 sm:h-36 object-cover rounded-xl transition-transform duration-200 group-hover:scale-[1.02]"
                />
            </div>

            {/* Contenido principal */}
            <div className="mt-2 flex-1 flex flex-col justify-between">
                <div>
                    <h3 title={title} className="text-sm font-semibold mb-1 text-center text-indigo-900">
                        {title}
                    </h3>
                    {/* <p className="text-sm text-gray-600 mb-2">Tipo: {type}</p> */}
                </div>


            </div>

        </div>
    );
}

// Example usage:
// <Materia title="Matemáticas I" url="https://example.com/matematicas" type="obligatoria" />
