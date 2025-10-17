export interface DescripcionProps {
    title: string;
    descripcion: string;
    url: string;
    urlMaterial: string;
    ubication?: string;
}
export function Descripcion({ title, descripcion, url, urlMaterial, ubication }: DescripcionProps) {
    return (
        <div className="p-3 sm:p-4 h-full flex flex-col align-center rounded-2xl bg-white/80 backdrop-blur-md border border-indigo-100 shadow-md">
            <h2 className="text-xs sm:text-sm text-center font-semibold text-indigo-900">{title}</h2>
            <span className="text-xs sm:text-xs text-slate-700 mt-1 mb-3 text-justify leading-relaxed">
                {descripcion}
            </span>
            <div className="flex flex-wrap gap-2 mt-auto mx-auto">
                {ubication === "RUA" && (
                    <a
                        href={url}
                        className="bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm shadow hover:bg-indigo-700 active:scale-[0.99] transition-all"
                        target='_blank'
                    >Detalles</a>
                )}
                <a
                    href={urlMaterial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm shadow hover:bg-blue-700 active:scale-[0.99] transition-all"
                >
                    Ir a recurso
                </a>
            </div>
        </div>
    );
}
