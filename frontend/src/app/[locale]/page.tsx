import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import SocialLinks from "@/components/home/SocialLinks";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://montevideofan.com";

const LOCALE_DESCRIPTIONS: Record<string, string> = {
  es: "Festival internacional de cine de terror, fantasía y ciencia ficción independiente. Montevideo y el Interior de Uruguay.",
  en: "International festival of independent horror, fantasy and science fiction cinema. Montevideo, Uruguay.",
  pt: "Festival internacional de cinema de terror, fantasia e ficção científica independente. Montevidéu, Uruguai.",
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  const description = LOCALE_DESCRIPTIONS[locale] ?? LOCALE_DESCRIPTIONS.es;
  const pageUrl = `${SITE_URL}/${locale}/`;
  const ogImage = `${SITE_URL}/media/og/xvi-og.jpg`;
  return {
    title: "Montevideo Fantástico",
    description,
    openGraph: {
      title: "Montevideo Fantástico",
      description,
      type: "website",
      url: pageUrl,
      siteName: "Montevideo Fantástico",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Montevideo Fantástico" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Montevideo Fantástico",
      description,
      images: [ogImage],
    },
  };
}

// Curated XVI gallery — 8 images for home preview
const GALLERY_XVI = [
  "/media/archive/XVI/gallery/mvdf-04.webp",
  "/media/archive/XVI/gallery/mvdf-09.webp",
  "/media/archive/XVI/gallery/mvdf-14.webp",
  "/media/archive/XVI/gallery/mvdf-19.webp",
  "/media/archive/XVI/gallery/mvdf-23.webp",
  "/media/archive/XVI/gallery/mvdf-28.webp",
  "/media/archive/XVI/gallery/mvdf-33.webp",
  "/media/archive/XVI/gallery/mvdf-40.webp",
] as const;

const COPY: Record<string, {
  sinceTag: string;
  heroSubtitle: string;
  heroTagline: string;
  heroCta1: string;
  heroCta2: string;
  aboutBadge: string;
  para1: string;
  para2: string;
  para3: string;
  callBadge: string;
  callHeading: string;
  callDesc: string;
  callNote: string;
  filmfreeway: string;
  festhome: string;
  callLearnMore: string;
  xviBadge: string;
  xviHeading: string;
  xviFacts: string;
  xviLink: string;
  galleryBadge: string;
  galleryHeading: string;
  galleryLink: string;
  avisBadge: string;
  avisHeading: string;
  avisText: string;
  avisCard1: string;
  avisCard2: string;
  avisWatch: string;
  archiveHeading: string;
  archiveText: string;
  archiveBtn: string;
}> = {
  es: {
    sinceTag: "Desde 2005 · Uruguay",
    heroSubtitle: "Festival internacional de cine fantástico, terror, fantasía y ciencia ficción.",
    heroTagline: "Desde 2005, Montevideo Fantástico promueve cine independiente y ultraindependiente, nacional e internacional, con especial atención a obras que raramente acceden a los circuitos comerciales y culturales tradicionales.",
    heroCta1: "Conocer el festival",
    heroCta2: "Archivo XVI",
    aboutBadge: "El festival",
    para1: "Primer festival cinematográfico en Uruguay dedicado exclusivamente al cine de terror, fantasía y ciencia ficción. Desde 2005, Montevideo Fantástico promueve producciones independientes y ultraindependientes, nacionales e internacionales, que difícilmente acceden a los circuitos comerciales y culturales tradicionales.",
    para2: "El festival cuenta con competencias de cortometrajes y largometrajes, muestras paralelas, clásicos del género, charlas con especialistas, homenajes a figuras del cine fantástico y una amplia programación de actividades culturales. Sus funciones han pasado por salas culturales, teatros y espacios independientes de Montevideo y del interior del Uruguay.",
    para3: "Montevideo Fantástico ha sido declarado de Interés Cultural por el Ministerio de Educación y Cultura, de Interés Municipal por la Intendencia de Montevideo y de Interés Turístico por el Ministerio de Turismo. También ha tenido presencia en el Festival Internacional de Cine de Punta del Este, Piriápolis de Película, Buenos Aires Rojo Sangre, El Ángel Exterminador, FIXIÓN Fest y Zinema Zombie Fest.",
    callBadge: "Convocatoria abierta",
    callHeading: "Montevideo Fantástico XVII",
    callDesc: "Cortometrajes, mediometrajes y largometrajes de terror, fantasía y ciencia ficción. Producciones independientes de cualquier país.",
    callNote: "Las inscripciones para la próxima edición se realizan a través de FilmFreeway y Festhome.",
    filmfreeway: "Inscribir en FilmFreeway",
    festhome: "Inscribir en Festhome",
    callLearnMore: "Ver convocatoria completa →",
    xviBadge: "Última edición",
    xviHeading: "Montevideo Fantástico XVI",
    xviFacts: "La edición XVI reunió 138 películas, 52 días de actividad y 22 sedes en Montevideo y el interior del país.",
    xviLink: "Ver el archivo completo de la XVI",
    galleryBadge: "Galería XVI",
    galleryHeading: "Imágenes de la última edición",
    galleryLink: "Ver galería completa →",
    avisBadge: "Registro audiovisual",
    avisHeading: "Galas de premiación",
    avisText: "Las entregas de premios también forman parte del registro público del festival. Reúnen a realizadores, jurados, público y equipo en el cierre de cada edición.",
    avisCard1: "Gala de premiación XVI · 2026",
    avisCard2: "Gala de premiación XV · 2024",
    avisWatch: "Ver en YouTube",
    archiveHeading: "Archivo histórico",
    archiveText: "Todas las ediciones de Montevideo Fantástico, desde 2005.",
    archiveBtn: "Explorar archivo",
  },
  en: {
    sinceTag: "Since 2005 · Uruguay",
    heroSubtitle: "International festival of horror, fantasy and science fiction cinema.",
    heroTagline: "Since 2005, Montevideo Fantástico has promoted independent and ultra-independent cinema from Uruguay and abroad, with a focus on films that rarely reach commercial screens or traditional cultural circuits.",
    heroCta1: "About the festival",
    heroCta2: "XVI Archive",
    aboutBadge: "The festival",
    para1: "Montevideo Fantástico is Uruguay's first film festival devoted exclusively to horror, fantasy and science fiction cinema. Since 2005, it has promoted independent and ultra-independent films from Uruguay and abroad, with a focus on works that rarely reach commercial screens or traditional cultural circuits.",
    para2: "The festival includes short film and feature film competitions, parallel screenings, genre classics, talks with specialists, tributes to figures from fantastic cinema and a wider programme of cultural activities. Its screenings have taken place in cultural centres, theatres and independent venues in Montevideo and across Uruguay.",
    para3: "Montevideo Fantástico has been declared of Cultural Interest by Uruguay's Ministry of Education and Culture, of Municipal Interest by the City of Montevideo and of Tourist Interest by the Ministry of Tourism. It has also been present at Punta del Este International Film Festival, Piriápolis de Película, Buenos Aires Rojo Sangre, El Ángel Exterminador, FIXIÓN Fest and Zinema Zombie Fest.",
    callBadge: "Open call",
    callHeading: "Montevideo Fantástico XVII",
    callDesc: "Short films, medium-length films and features in horror, fantasy and science fiction. Independent productions from any country.",
    callNote: "Submissions for the next edition are handled through FilmFreeway and Festhome.",
    filmfreeway: "Submit on FilmFreeway",
    festhome: "Submit on Festhome",
    callLearnMore: "View full open call →",
    xviBadge: "Latest edition",
    xviHeading: "Montevideo Fantástico XVI",
    xviFacts: "Edition XVI brought together 138 films, 52 days of activity and 22 venues across Montevideo and the interior of Uruguay.",
    xviLink: "View the complete XVI archive",
    galleryBadge: "XVI Gallery",
    galleryHeading: "Images from the latest edition",
    galleryLink: "View full gallery →",
    avisBadge: "Audiovisual record",
    avisHeading: "Awards ceremonies",
    avisText: "The award ceremonies are part of the festival's public record. They bring together filmmakers, juries, audiences and the team at the close of each edition.",
    avisCard1: "XVI Awards Ceremony · 2026",
    avisCard2: "XV Awards Ceremony · 2024",
    avisWatch: "Watch on YouTube",
    archiveHeading: "Historical archive",
    archiveText: "All editions of Montevideo Fantástico, from 2005 onward.",
    archiveBtn: "Explore archive",
  },
  pt: {
    sinceTag: "Desde 2005 · Uruguai",
    heroSubtitle: "Festival internacional de cinema fantástico, terror, fantasia e ficção científica.",
    heroTagline: "Desde 2005, o Montevideo Fantástico promove cinema independente e ultraindependente, nacional e internacional, com atenção especial a obras que raramente chegam aos circuitos comerciais e culturais tradicionais.",
    heroCta1: "Conhecer o festival",
    heroCta2: "Arquivo XVI",
    aboutBadge: "O festival",
    para1: "Montevideo Fantástico é o primeiro festival cinematográfico do Uruguai dedicado exclusivamente ao cinema de terror, fantasia e ficção científica. Desde 2005, promove produções independentes e ultraindependentes, nacionais e internacionais, que dificilmente chegam aos circuitos comerciais e culturais tradicionais.",
    para2: "O festival conta com competições de curtas e longas-metragens, mostras paralelas, clássicos do gênero, conversas com especialistas, homenagens a figuras do cinema fantástico e uma ampla programação de atividades culturais. Suas sessões já passaram por centros culturais, teatros e espaços independentes de Montevidéu e do interior do Uruguai.",
    para3: "Montevideo Fantástico foi declarado de Interesse Cultural pelo Ministério da Educação e Cultura, de Interesse Municipal pela Intendência de Montevidéu e de Interesse Turístico pelo Ministério do Turismo. Também esteve presente no Festival Internacional de Cinema de Punta del Este, em Piriápolis de Película, Buenos Aires Rojo Sangre, El Ángel Exterminador, FIXIÓN Fest e Zinema Zombie Fest.",
    callBadge: "Convocatória aberta",
    callHeading: "Montevideo Fantástico XVII",
    callDesc: "Curtas, médias e longas-metragens de terror, fantasia e ficção científica. Produções independentes de qualquer país.",
    callNote: "As inscrições para a próxima edição são realizadas através do FilmFreeway e do Festhome.",
    filmfreeway: "Inscrever no FilmFreeway",
    festhome: "Inscrever no Festhome",
    callLearnMore: "Ver convocatória completa →",
    xviBadge: "Última edição",
    xviHeading: "Montevideo Fantástico XVI",
    xviFacts: "A edição XVI reuniu 138 filmes, 52 dias de atividade e 22 sedes em Montevidéu e no interior do país.",
    xviLink: "Ver o arquivo completo da XVI",
    galleryBadge: "Galeria XVI",
    galleryHeading: "Imagens da última edição",
    galleryLink: "Ver galeria completa →",
    avisBadge: "Registro audiovisual",
    avisHeading: "Galas de premiação",
    avisText: "As cerimônias de premiação também fazem parte do registro público do festival. Elas reúnem realizadores, júris, público e equipe no encerramento de cada edição.",
    avisCard1: "Gala de premiação XVI · 2026",
    avisCard2: "Gala de premiação XV · 2024",
    avisWatch: "Ver no YouTube",
    archiveHeading: "Arquivo histórico",
    archiveText: "Todas as edições do Montevideo Fantástico, desde 2005.",
    archiveBtn: "Explorar arquivo",
  },
};

export default async function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale;
  const copy = COPY[locale] ?? COPY.es;

  // /[locale]/archivo/2026/ is the only valid 2026 archive URL for all locales
  const archiveHref = `/${locale}/archivo/2026/`;
  const archiveIndexHref = `/${locale}/archivo/`;
  const editionRoute = locale === "es" ? "edicion" : "edition";
  const editionHref = `/${locale}/${editionRoute}/`;

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-void">
        {/* Atmospheric gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-48 -right-48 w-[80vw] max-w-[900px] aspect-square rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 60%)" }}
          />
          <div
            className="absolute bottom-[-10%] left-[10%] w-[65vw] max-w-[750px] aspect-square rounded-full"
            style={{ background: "radial-gradient(circle, rgba(162,89,247,0.07) 0%, transparent 60%)" }}
          />
        </div>
        {/* Mobile hero — subtle full-bleed atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none block md:hidden overflow-hidden">
          <Image
            src="/media/archive/XVI/gallery/mvdf-28.webp"
            alt=""
            fill
            className="object-cover object-center"
            style={{ opacity: 0.12 }}
            aria-hidden="true"
          />
          <div className="absolute inset-0" style={{ background: "rgba(7,11,20,0.72)" }} />
        </div>
        {/* Desktop photo — right side, atmospheric */}
        <div className="absolute inset-y-0 right-0 w-[52%] z-0 pointer-events-none hidden md:block">
          <Image
            src="/media/archive/XVI/gallery/mvdf-28.webp"
            alt=""
            fill
            className="object-cover object-center"
            style={{ opacity: 0.32 }}
            priority
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #070b14 0%, #070b14 12%, transparent 62%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #070b14 0%, transparent 45%)" }}
          />
        </div>
        {/* Content */}
        <div className="container-wide section-padding relative z-10 py-28 md:py-40">
          <div className="w-full md:max-w-[min(50%,640px)]">
          <p
            className="font-sans text-[10px] uppercase tracking-[0.35em] mb-5"
            style={{ color: "rgba(0,212,255,0.55)" }}
          >
            {copy.sinceTag}
          </p>
          <h1
            className="font-display leading-none text-white mb-5"
            style={{ fontSize: "clamp(3.2rem, 9vw, 7rem)" }}
          >
            Montevideo
            <br />
            <span style={{ WebkitTextStroke: "1px rgba(0,212,255,0.50)", color: "transparent" }}>
              Fantástico
            </span>
          </h1>
          <p
            className="font-sans text-base md:text-lg font-light mb-3"
            style={{ color: "rgba(255,255,255,0.78)" }}
          >
            {copy.heroSubtitle}
          </p>
          <p
            className="font-sans text-sm leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {copy.heroTagline}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#festival"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold px-6 py-3 text-void transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00d4ff, #a259f7)" }}
            >
              {copy.heroCta1}
            </a>
            <Link
              href={archiveHref}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold px-6 py-3 transition-colors"
              style={{ border: "1px solid rgba(162,89,247,0.45)", color: "rgba(162,89,247,0.90)" }}
            >
              {copy.heroCta2}
            </Link>
          </div>
          </div>{/* end md:max-w-[min(50%,640px)] */}
        </div>
      </section>

      {/* ── EL FESTIVAL / INSTITUTIONAL ─────────────────────────── */}
      <section id="festival" className="section-padding" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container-wide" style={{ maxWidth: "60rem" }}>
          <p
            className="font-sans text-[10px] uppercase tracking-[0.35em] mb-6 font-medium"
            style={{ color: "rgba(0,212,255,0.55)" }}
          >
            {copy.aboutBadge}
          </p>
          <div className="space-y-5">
            <p className="font-sans text-base md:text-[1.0625rem] leading-[1.8]" style={{ color: "rgba(255,255,255,0.82)" }}>
              {copy.para1}
            </p>
            <p className="font-sans text-base md:text-[1.0625rem] leading-[1.8]" style={{ color: "rgba(255,255,255,0.78)" }}>
              {copy.para2}
            </p>
            <p className="font-sans text-base md:text-[1.0625rem] leading-[1.8]" style={{ color: "rgba(255,255,255,0.72)" }}>
              {copy.para3}
            </p>
          </div>
        </div>
      </section>

      {/* ── ÚLTIMA EDICIÓN — XVI ─────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Poster */}
            <div
              className="relative w-full max-w-xs mx-auto md:mx-0"
              style={{ aspectRatio: "3/4", border: "1px solid rgba(162,89,247,0.22)" }}
            >
              <Image
                src="/media/archive/XVI/poster.jpg"
                alt="Montevideo Fantástico XVI — Afiche oficial"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(7,11,20,0.60) 0%, transparent 50%)" }}
              />
            </div>
            {/* Text */}
            <div>
              <p
                className="font-sans text-[10px] uppercase tracking-[0.35em] mb-3 font-medium"
                style={{ color: "rgba(162,89,247,0.80)" }}
              >
                {copy.xviBadge}
              </p>
              <h2
                className="font-display text-white leading-none mb-5"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                {copy.xviHeading}
              </h2>
              <p
                className="font-sans text-base leading-relaxed mb-8"
                style={{ color: "rgba(255,255,255,0.60)" }}
              >
                {copy.xviFacts}
              </p>
              <Link
                href={archiveHref}
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold px-6 py-3 transition-colors"
                style={{ border: "1px solid rgba(162,89,247,0.45)", color: "rgba(162,89,247,0.90)" }}
              >
                {copy.xviLink}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTRO AUDIOVISUAL ─────────────────────────────────── */}
      <section
        className="section-padding"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,212,255,0.015)" }}
      >
        <div className="container-wide">
          <p
            className="font-sans text-[10px] uppercase tracking-[0.35em] mb-3 font-medium"
            style={{ color: "rgba(0,212,255,0.60)" }}
          >
            {copy.avisBadge}
          </p>
          <h2
            className="font-display text-white leading-none mb-4"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
          >
            {copy.avisHeading}
          </h2>
          <p
            className="font-sans text-base mb-10 max-w-2xl"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            {copy.avisText}
          </p>
          <div className="grid md:grid-cols-[1fr_360px] gap-5">
            {/* 2026 — FEATURED */}
            <a
              href="https://youtu.be/Hq-ksSW9HTA?t=1"
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden"
              style={{ border: "1px solid rgba(0,212,255,0.25)", display: "block" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src="/media/archive/XVI/gallery/mvdf-04.webp"
                  alt=""
                  fill
                  className="object-cover opacity-50 transition-opacity duration-300 group-hover:opacity-70"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "rgba(7,11,20,0.30)" }}
                >
                  <svg viewBox="0 0 60 60" className="w-16 h-16" fill="none" aria-hidden="true">
                    <circle cx="30" cy="30" r="29" stroke="rgba(0,212,255,0.80)" strokeWidth="1.5" />
                    <polygon points="24,18 44,30 24,42" fill="rgba(0,212,255,0.95)" />
                  </svg>
                </div>
              </div>
              <div className="p-5" style={{ background: "rgba(0,0,0,0.25)" }}>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: "#00d4ff" }}>
                  2026 · XVI
                </p>
                <p className="font-display text-xl text-white leading-snug mb-2">
                  {copy.avisCard1}
                </p>
                <p className="font-sans text-sm" style={{ color: "rgba(0,212,255,0.70)" }}>
                  {copy.avisWatch} ↗
                </p>
              </div>
            </a>
            {/* 2024 — secondary */}
            <a
              href="https://youtu.be/oC7NflnelgY"
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden"
              style={{ border: "1px solid rgba(162,89,247,0.20)", display: "block" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src="/media/home/featured/awards-02.jpg"
                  alt=""
                  fill
                  className="object-cover opacity-40 transition-opacity duration-300 group-hover:opacity-60"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "rgba(7,11,20,0.40)" }}
                >
                  <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none" aria-hidden="true">
                    <circle cx="30" cy="30" r="29" stroke="rgba(162,89,247,0.65)" strokeWidth="1.5" />
                    <polygon points="24,18 44,30 24,42" fill="rgba(162,89,247,0.85)" />
                  </svg>
                </div>
              </div>
              <div className="p-4" style={{ background: "rgba(0,0,0,0.18)" }}>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: "rgba(162,89,247,0.80)" }}>
                  2024 · XV
                </p>
                <p className="font-sans text-base font-medium text-white leading-snug mb-2">
                  {copy.avisCard2}
                </p>
                <p className="font-sans text-xs" style={{ color: "rgba(162,89,247,0.65)" }}>
                  {copy.avisWatch} ↗
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW — XVI ─────────────────────────────────── */}
      <section
        className="section-padding"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container-wide">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p
                className="font-sans text-[10px] uppercase tracking-[0.35em] mb-2 font-medium"
                style={{ color: "rgba(0,212,255,0.55)" }}
              >
                {copy.galleryBadge}
              </p>
              <h2
                className="font-display text-white leading-none"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
              >
                {copy.galleryHeading}
              </h2>
            </div>
            <Link
              href={`${archiveHref}#galeria`}
              className="font-sans text-[10px] tracking-widest uppercase transition-colors"
              style={{ color: "rgba(162,89,247,0.70)" }}
            >
              {copy.galleryLink}
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {GALLERY_XVI.map((src, i) => (
              <Link
                key={src}
                href={`${archiveHref}#galeria`}
                className="block relative overflow-hidden group"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={src}
                  alt={`Montevideo Fantástico XVI — imagen ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── XVII SUBMISSIONS CTA ────────────────────────────────── */}
      <section
        className="section-padding"
        style={{
          borderTop: "1px solid rgba(0,212,255,0.10)",
          borderBottom: "1px solid rgba(0,212,255,0.10)",
          background: "rgba(0,212,255,0.022)",
        }}
      >
        <div className="container-wide">
          <p
            className="font-sans text-[10px] uppercase tracking-[0.35em] mb-3 font-medium"
            style={{ color: "#00d4ff" }}
          >
            {copy.callBadge}
          </p>
          <h2
            className="font-display text-white leading-none mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {copy.callHeading}
          </h2>
          <p
            className="font-sans text-base font-light mb-7 max-w-xl"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {copy.callNote}
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
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
          <Link
            href={editionHref}
            className="font-sans text-xs uppercase tracking-widest transition-colors"
            style={{ color: "rgba(0,212,255,0.70)" }}
          >
            {copy.callLearnMore}
          </Link>
        </div>
      </section>

      {/* ── ARCHIVO HISTÓRICO — compact CTA ──────────────────────── */}
      <section
        className="section-padding"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container-wide">
          <div
            className="flex flex-col sm:flex-row sm:items-center gap-6 p-7 sm:p-10"
            style={{ background: "rgba(162,89,247,0.05)", border: "1px solid rgba(162,89,247,0.20)" }}
          >
            <div className="flex-1 min-w-0">
              <h3
                className="font-display text-white leading-none mb-3"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)" }}
              >
                {copy.archiveHeading}
              </h3>
              <p className="font-sans text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
                {copy.archiveText}
              </p>
            </div>
            <Link
              href={archiveIndexHref}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold px-7 py-3.5 flex-shrink-0 transition-colors"
              style={{ border: "1px solid rgba(162,89,247,0.45)", color: "rgba(162,89,247,0.90)" }}
            >
              {copy.archiveBtn}
            </Link>
          </div>
        </div>
      </section>

      <SocialLinks />
    </>
  );
}
