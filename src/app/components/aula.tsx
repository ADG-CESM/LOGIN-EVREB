
import { Newspaper, GraduationCap, School, Link as LinkIcon } from 'lucide-react';

interface ClassCardProps {
    id: string;
    name: string;
    CCH: number;
    color: string;
    RUA: number;
    Referencias: number;
    isSelected: boolean;
    onClick: () => void;
}

export function ClassCard({
    name,
    RUA,
    color,
    CCH,
    Referencias,
    isSelected,
    onClick
}: ClassCardProps) {
    return (
        <div
            role="button"
            tabIndex={0}
            className={`flex w-full overflow-hidden rounded-xl p-3 sm:p-2 cursor-pointer transition-all hover:shadow-lg ${isSelected ? 'ring-2 ring-gray-400 rounded-xl shadow-md' : ''}`}
            onClick={onClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
        >
            <div className="flex flex-col items-start justify-between mb-3">
                <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: color }}
                >
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                {isSelected && <div className="bg-primary px-2 py-1 text-xs rounded">Seleccionada</div>}

            </div>



            <div className="flex flex-col ml-2 min-w-0 space-x-2 text-muted-foreground overflow-hidden">
                <h3 title={name} className="mb-2 text-sm sm:text-sm font-medium break-words line-clamp-2">{name}</h3>
                <div className="flex items-center space-x-2 w-full">
                    <div className="flex items-center gap-2">
                        <Newspaper className="w-4 h-4" />
                        <span className="text-sm truncate">{RUA}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <School className="w-4 h-4" />
                        <span className="text-sm truncate">{CCH}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        <span className="text-sm truncate">{Referencias}</span>
                    </div>

                </div>


            </div>
        </div>
    );
}
