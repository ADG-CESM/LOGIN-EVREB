import PortadaSemestre from "../components/portada-semestre";

export default function PrimerSemestrePage() {
    return (
        <main>
            <PortadaSemestre
                titulo="RECURSOS EDUCATIVOS - PRIMER SEMESTRE"
                hrefTablero="/dashboard/tablero"
                cta="Explorar tablero"
            />
        </main>
    );
}
