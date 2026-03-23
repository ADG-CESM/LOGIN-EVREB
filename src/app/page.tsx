import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <section className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">


        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/primer-semestre"
            className="inline-flex items-center justify-center rounded-xl bg-[#193d77] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163463]"
          >
            Primer semestre
          </Link>
          <Link
            href="/segundo-semestre"
            className="inline-flex items-center justify-center rounded-xl bg-[#193d77] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163463]"
          >
            Segundo semestre
          </Link>
        </div>
      </section>
    </main>
  );
} 
