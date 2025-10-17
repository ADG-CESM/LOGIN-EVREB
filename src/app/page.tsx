import dynamic from "next/dynamic";

const Portada = dynamic(() => import("./components/portada"), { ssr: true });

export default function Home() {
  return (
    <main>
      <Portada />
    </main>
  );
}
