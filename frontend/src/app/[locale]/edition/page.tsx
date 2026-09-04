import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://montevideofan.com";

export const metadata: Metadata = {
  title: "Convocatoria XVII — Montevideo Fantástico",
  description: "Inscripciones abiertas para Montevideo Fantástico XVII. Cortometrajes, mediometrajes y largometrajes de terror, fantasía y ciencia ficción. Producciones independientes de cualquier país.",
  openGraph: {
    title: "Montevideo Fantástico XVII — Convocatoria abierta",
    description: "Inscripciones abiertas para Montevideo Fantástico XVII. Terror, fantasía y ciencia ficción. Producciones independientes de cualquier país.",
    type: "website",
    url: `${SITE_URL}/es/edicion`,
    images: [{ url: `${SITE_URL}/media/og/xvi-og.jpg`, width: 1200, height: 630, alt: "Montevideo Fantástico" }],
    siteName: "Montevideo Fantástico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Montevideo Fantástico XVII — Convocatoria abierta",
    description: "Inscripciones abiertas. Terror, fantasía y ciencia ficción. Cualquier país.",
    images: [`${SITE_URL}/media/og/xvi-og.jpg`],
  },
};

const COPY: Record<string, {
  editionBadge: string;
  heading: string;
  subheading: string;
  descLines: string[];
  callHeading: string;
  callNote: string;
  filmfreeway: string;
  festhome: string;
  acceptedHeading: string;
  acceptedText: string;
  archiveBadge: string;
  archiveHeading: string;
  archiveDesc: string;
  archiveLink: string;
}> = {
  es: {
    editionBadge: "Convocatoria abierta",
    heading: "Montevideo Fantástico XVII",
    subheading: "Festival internacional de cine de terror, fantasía y ciencia ficción independiente",
    descLines: [
      "El Festival Montevideo Fantástico convoca a películas de terror, fantasía y ciencia ficción de producción independiente y ultra-independiente de todo el mundo.",
    ],
    callHeading: "Inscribir una película",
    callNote: "Las inscripciones se realizan a través de las siguientes plataformas:",
    filmfreeway: "Inscribir en FilmFreeway",
    festhome: "Inscribir en Festhome",
    acceptedHeading: "Qué recibimos",
    acceptedText: "El festival recibe cortometrajes, mediometrajes y largometrajes de terror, fantasía, ciencia ficción y cine fantástico en general. Las obras pueden incluir ficción, animación, documental e híbridos. Se priorizan producciones independientes y ultra-independientes de cualquier país.",
    archiveBadge: "Archivo 2026",
    archiveHeading: "Montevideo Fantástico XVI",
    archiveDesc: "Premios, películas seleccionadas, galería y sedes de la edición 2026.",
    archiveLink: "Ver el archivo completo →",
  },
  en: {
    editionBadge: "Open call",
    heading: "Montevideo Fantástico XVII",
    subheading: "Uruguay’s independent horror, fantasy and science fiction film festival",
    descLines: [
      "Montevideo Fantástico welcomes independent and ultra-independent films in horror, fantasy and science fiction from filmmakers anywhere in the world. Short films, medium-length films and feature films are all eligible.",
    ],
    callHeading: "Submit a film",
    callNote: "Submissions are open through the following platforms:",
    filmfreeway: "Submit on FilmFreeway",
    festhome: "Submit on Festhome",
    acceptedHeading: "What we accept",
    acceptedText: "The festival receives short films, medium-length films and features in horror, fantasy, science fiction and fantastic cinema broadly. Works may include fiction, animation, documentary and hybrid formats. Independent and ultra-independent productions from any country are welcome.",
    archiveBadge: "2026 Archive",
    archiveHeading: "Montevideo Fantástico XVI",
    archiveDesc: "Awards, selected films, photo gallery and venues from the 2026 edition — the most recent completed edition of the festival.",
    archiveLink: "View the complete archive →",
  },
  pt: {
    editionBadge: "Convocatória aberta",
    heading: "Montevideo Fantástico XVII",
    subheading: "O festival uruguaio de cinema independente de terror, fantasia e ficção científica",
    descLines: [
      "O Festival Montevideo Fantástico convoca filmes independentes e ultra-independentes de terror, fantasia e ficção científica de qualquer parte do mundo. Curtas, médias e longas-metragens são bem-vindos.",
    ],
    callHeading: "Inscrever um filme",
    callNote: "As inscrições estão abertas pelas seguintes plataformas:",
    filmfreeway: "Inscrever no FilmFreeway",
    festhome: "Inscrever no Festhome",
    acceptedHeading: "O que recebemos",
    acceptedText: "O festival recebe curtas, médias e longas-metragens de terror, fantasia, ficção científica e cinema fantástico em geral. As obras podem incluir ficção, animação, documentário e formatos híbridos. Produções independentes e ultra-independentes de qualquer país são bem-vindas.",
    archiveBadge: "Arquivo 2026",
    archiveHeading: "Montevideo Fantástico XVI",
    archiveDesc: "Prêmios, filmes selecionados, galeria de fotos e sedes da edição 2026 — a edição concluída mais recente do festival.",
    archiveLink: "Ver o arquivo completo →",
  },
};




export default async function CurrentEditionPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  setRequestLocale(locale);
  const copy = COPY[locale] ?? COPY.es;

  const archiveHref = `/${locale}/archivo/2026/`;

  return (
    <div className="container-wide section-padding">

      {/* ── HERO — XVII open call ─────────────────────────────────── */}
      <div className="mb-12 md:mb-16">
        <p
          className="font-sans text-[10px] uppercase tracking-[0.35em] mb-4"
          style={{ color: "#00d4ff" }}
        >
          {copy.editionBadge}
        </p>
        <h1
          className="font-display leading-none text-white mb-4"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
        >
          {copy.heading}
        </h1>
        <p
          className="font-sans text-base md:text-lg font-light mb-6 max-w-2xl"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          {copy.subheading}
        </p>
        <div
          className="border-l-2 pl-5 mb-8 max-w-2xl"
          style={{ borderColor: "rgba(0,212,255,0.25)" }}
        >
          {copy.descLines.map((line, i) => (
            <p
              key={i}
              className="text-base leading-relaxed font-light mb-3 last:mb-0"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* ── SUBMISSIONS CTA ───────────────────────────────────────── */}
      <section
        className="mb-14 p-7 md:p-10"
        style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(162,89,247,0.06) 100%)",
          border: "1px solid rgba(0,212,255,0.22)",
          borderLeft: "4px solid #00d4ff",
        }}
      >
        <h2
          className="font-display text-white leading-none mb-3"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
        >
          {copy.callHeading}
        </h2>
        <p
          className="font-sans text-sm mb-7"
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          {copy.callNote}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://filmfreeway.com/MontevideoFantastico"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold px-6 py-3 text-void transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #00d4ff, #a259f7)" }}
          >
            {copy.filmfreeway}
          </a>
          <a
            href="https://filmmakers.festhome.com/es/festival/montevideo-fantastico"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold px-6 py-3 transition-colors"
            style={{ border: "1px solid rgba(0,212,255,0.40)", color: "rgba(0,212,255,0.90)" }}
          >
            {copy.festhome}
          </a>
        </div>
      </section>

      {/* ── WHAT WE ACCEPT ────────────────────────────────────────── */}
      <section className="mb-14">
        <h2
          className="font-display text-white mb-6 pb-3"
          style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", borderBottom: "1px solid rgba(0,212,255,0.15)" }}
        >
          {copy.acceptedHeading}
        </h2>
        <p
          className="font-sans text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          {copy.acceptedText}
        </p>
      </section>

      {/* ── XVI ARCHIVE LINK ──────────────────────────────────────── */}
      <section className="mb-14">
        <Link
          href={archiveHref}
          className="group flex flex-col sm:flex-row sm:items-center gap-5 p-6 sm:p-8 transition-colors"
          style={{
            background: "rgba(162,89,247,0.04)",
            border: "1px solid rgba(162,89,247,0.18)",
          }}
        >
          <div className="flex-1 min-w-0">
            <p
              className="font-sans text-[10px] uppercase tracking-[0.35em] mb-2"
              style={{ color: "rgba(162,89,247,0.70)" }}
            >
              {copy.archiveBadge}
            </p>
            <h3
              className="font-display text-white leading-none mb-2"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)" }}
            >
              {copy.archiveHeading}
            </h3>
            <p className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.52)" }}>
              {copy.archiveDesc}
            </p>
          </div>
          <span
            className="font-sans text-xs uppercase tracking-widest font-bold flex-shrink-0 transition-transform group-hover:translate-x-1"
            style={{ color: "rgba(162,89,247,0.80)" }}
          >
            {copy.archiveLink}
          </span>
        </Link>
      </section>

    </div>
  );
}
