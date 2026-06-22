import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { FILMS_2026, CATEGORY_LABELS, getCategoryLabel, getFilmSynopsis, getFilmFestivalNote, getFilmBySlug } from "@/data/films-2026";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/film/ShareButtons";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://montevideofan.com";

// Slugs that have a dedicated 1200×630 OG crop under /media/og/films/
const OG_FILM_CROPS = new Set([
  "alguien-los-vigila",
  "el-amor-mata",
  "el-convento",
  "el-fantastico-matt-parey",
  "el-ritual-de-huasao",
  "godzilla-en-santa-fe",
  "hotel-fin",
  "la-maldicion-de-hernandez-chaney",
  "la-noche-que-nunca-termina",
  "martin-vuelve",
  "panchopalooza",
  "plesiosaurios-vivos",
  "que-paso-con-nath-666",
  "sasyq",
  "sombras-del-sur",
  "venga-a-nosotros-tu-reino",
]);

interface PageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  const locales = ["es", "en", "pt"];
  return locales.flatMap((locale) =>
    FILMS_2026.map((film) => ({ locale, slug: film.slug }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const film = getFilmBySlug(params.slug);
  if (!film) return { title: "Película — Montevideo Fantástico" };
  const description = (params.locale === "en" ? film.synopsis_en : params.locale === "pt" ? film.synopsis_pt : undefined) || film.synopsis;
  // Use dedicated 1200×630 OG crop if available, otherwise fall back to poster (absolute URL), then edition default
  const ogImageUrl = OG_FILM_CROPS.has(film.slug)
    ? `${SITE_URL}/media/og/films/${film.slug}.jpg`
    : film.poster
    ? `${SITE_URL}${film.poster}`
    : `${SITE_URL}/media/og/xvi-og.jpg`;
  const pageUrl = `${SITE_URL}/${params.locale}/film/${film.slug}`;
  return {
    title: `${film.title} — Montevideo Fantástico XVI`,
    description,
    openGraph: {
      title: `${film.title} — Montevideo Fantástico XVI`,
      description,
      type: "video.movie",
      url: pageUrl,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: film.title }],
      siteName: "Montevideo Fantástico",
    },
    twitter: {
      card: "summary_large_image",
      title: `${film.title} — Montevideo Fantástico XVI`,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function FilmDetailPage({ params }: PageProps) {
  const { locale, slug } = params;
  setRequestLocale(locale);

  const film = getFilmBySlug(slug);
  if (!film) notFound();

  const editionPath = `/${locale}/${locale === "es" ? "edicion" : "edition"}`;
  const { technical_sheet: ts } = film;
  const pageUrl = `${SITE_URL}/${locale}/film/${film.slug}/`;

  const synopsis = getFilmSynopsis(film, locale);
  const festivalNote = getFilmFestivalNote(film, locale);
  const categoryLabel = getCategoryLabel(film.category, locale);

  const L = locale === "en" ? {
    backLabel: "Edition 2026",
    festivalNoteLabel: "Festival note by Alejandro Yamgotchian",
    technicalSheet: "Technical Sheet",
    direction: "Direction",
    screenplay: "Screenplay",
    country: "Country",
    year: "Year",
    duration: "Duration",
    minutes: "min",
    rating: "Rating",
    cast: "Cast",
    watchTrailer: "Watch Trailer",
    backCta: "View 2026 programme",
    posterSoon: "Poster coming soon",
    posterLabel: "Poster",
  } : locale === "pt" ? {
    backLabel: "Edi\u00e7\u00e3o 2026",
    festivalNoteLabel: "Nota do festival por Alejandro Yamgotchian",
    technicalSheet: "Ficha T\u00e9cnica",
    direction: "Dire\u00e7\u00e3o",
    screenplay: "Roteiro",
    country: "Pa\u00eds",
    year: "Ano",
    duration: "Dura\u00e7\u00e3o",
    minutes: "min",
    rating: "Classifica\u00e7\u00e3o",
    cast: "Elenco",
    watchTrailer: "Ver trailer",
    backCta: "Ver programa\u00e7\u00e3o 2026",
    posterSoon: "Cartaz em breve",
    posterLabel: "Cartaz",
  } : {
    backLabel: "Edici\u00f3n 2026",
    festivalNoteLabel: "Nota del festival por Alejandro Yamgotchian",
    technicalSheet: "Ficha T\u00e9cnica",
    direction: "Direcci\u00f3n",
    screenplay: "Gui\u00f3n",
    country: "Pa\u00eds",
    year: "A\u00f1o",
    duration: "Duraci\u00f3n",
    minutes: "minutos",
    rating: "Clasificaci\u00f3n",
    cast: "Elenco",
    watchTrailer: "Ver trailer",
    backCta: "Ver programaci\u00f3n 2026",
    posterSoon: "Afiche pr\u00f3ximamente",
    posterLabel: "Afiche",
  };

  return (
    <div className="container-wide section-padding">
      {/* Back link */}
      <Link
        href={editionPath}
        className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-text-muted hover:text-plasma transition-colors mb-10"
      >
        <svg viewBox="0 0 16 10" className="w-4 h-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5H1M6 1L1 5l5 4" />
        </svg>
        {L.backLabel}
      </Link>

      {/* Hero grid */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 md:gap-12 mb-12">
        {/* Poster */}
        <div className="flex-shrink-0">
          <div className="relative aspect-[2/3] w-full max-w-[260px] mx-auto md:max-w-none overflow-hidden"
            style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
            {film.poster ? (
              <Image
                src={film.poster}
                alt={film.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 260px, 320px"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: "#0c1220" }}>
                <span className="font-display text-text-muted text-xs uppercase tracking-widest text-center px-4">
                  {L.posterSoon}
                </span>
              </div>
            )}
          </div>
          {film.poster && film.poster_credit && (
            <p className="font-sans text-[10px] text-text-muted mt-1.5 text-center tracking-wide">
              {L.posterLabel}: {film.poster_credit}
            </p>
          )}
        </div>

        {/* Header info */}
        <div className="flex flex-col justify-end">
          {/* Category badge */}
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-plasma mb-4 font-medium">
            {categoryLabel}
          </p>

          {/* Title */}
          <h1
            className="font-display text-text-primary leading-none mb-2"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
          >
            {film.title}
          </h1>

          {/* Original title */}
          {film.original_title && (
            <p className="font-sans text-sm text-text-muted italic mb-4">
              {film.original_title}
            </p>
          )}

          {/* Meta bar */}
          <div className="flex items-center gap-4 mb-8">
            <span className="block h-px w-8 bg-plasma flex-shrink-0" />
            <div className="flex flex-wrap items-center gap-3 font-sans text-sm md:text-base tracking-wide uppercase text-text-secondary">
              <span>{film.country}</span>
              <span className="text-text-muted">·</span>
              <span>{film.year}</span>
              <span className="text-text-muted">·</span>
              <span>{ts.duration_minutes} min</span>
              {ts.rating && (
                <>
                  <span className="text-text-muted">·</span>
                  <span
                    className="px-1.5 py-0.5 font-mono text-xs"
                    style={{ border: "1px solid rgba(255,255,255,0.20)" }}
                  >
                    {ts.rating}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Synopsis */}
          {synopsis && (
            <p className="font-sans text-base md:text-lg leading-loose max-w-2xl" style={{ color: 'rgba(255,255,255,0.82)' }}>
              {synopsis}
            </p>
          )}

          {/* Share */}
          <div className="mt-6">
            <ShareButtons url={pageUrl} title={film.title} />
          </div>
        </div>
      </div>

      {/* Festival note — only render if note is present */}
      {festivalNote && (
        <section
          className="mb-12 p-6 md:p-8"
          style={{ background: "rgba(0,212,255,0.04)", borderLeft: "2px solid rgba(0,212,255,0.30)" }}
        >
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-plasma mb-3 font-semibold">
            {L.festivalNoteLabel}
          </p>
          <p className="font-sans text-[0.95rem] md:text-base leading-loose" style={{ color: 'rgba(255,255,255,0.78)' }}>
            {festivalNote}
          </p>
        </section>
      )}

      {/* Trailer */}
      {film.trailer && (
        <section className="mb-12">
          <h2
            className="font-display text-white mb-4 pb-3"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {L.watchTrailer}
          </h2>
          <div
            className="relative overflow-hidden w-full"
            style={{ background: "#000", border: "1px solid rgba(0,212,255,0.12)" }}
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              controls
              preload="metadata"
              poster={film.poster || undefined}
              className="w-full block max-h-[70vh]"
              style={{ display: "block" }}
            >
              <source src={film.trailer} type="video/mp4" />
            </video>
          </div>
        </section>
      )}

      {/* Technical sheet */}
      <section className="mb-16">
        <h2
          className="font-display text-white mb-6 pb-3"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          {L.technicalSheet}
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
          <div>
            <dt className="font-sans text-[10px] uppercase tracking-widest text-text-muted mb-1">{L.direction}</dt>
            <dd className="font-sans text-sm md:text-base text-text-primary">{ts.direction}</dd>
          </div>
          {ts.screenplay && (
            <div>
              <dt className="font-sans text-[10px] uppercase tracking-widest text-text-muted mb-1">{L.screenplay}</dt>
              <dd className="font-sans text-sm md:text-base text-text-primary">{ts.screenplay}</dd>
            </div>
          )}
          <div>
            <dt className="font-sans text-[10px] uppercase tracking-widest text-text-muted mb-1">{L.country}</dt>
            <dd className="font-sans text-sm md:text-base text-text-primary">{film.country}</dd>
          </div>
          <div>
            <dt className="font-sans text-[10px] uppercase tracking-widest text-text-muted mb-1">{L.year}</dt>
            <dd className="font-sans text-sm md:text-base text-text-primary">{film.year}</dd>
          </div>
          <div>
            <dt className="font-sans text-[10px] uppercase tracking-widest text-text-muted mb-1">{L.duration}</dt>
            <dd className="font-sans text-sm md:text-base text-text-primary">{ts.duration_minutes} {L.minutes}</dd>
          </div>
          {ts.rating && (
            <div>
              <dt className="font-sans text-[10px] uppercase tracking-widest text-text-muted mb-1">{L.rating}</dt>
              <dd className="font-sans text-sm md:text-base text-text-primary">{ts.rating}</dd>
            </div>
          )}
          {ts.cast && ts.cast.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="font-sans text-[10px] uppercase tracking-widest text-text-muted mb-1">{L.cast}</dt>
              <dd className="font-sans text-sm md:text-base text-text-primary">{ts.cast.join(", ")}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* Back CTA */}
      <div className="border-t border-white/8 pt-8">
        <Link href={editionPath} className="btn-ghost inline-flex items-center gap-2">
          <svg viewBox="0 0 16 10" className="w-4 h-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5H1M6 1L1 5l5 4" />
          </svg>
          {L.backCta}
        </Link>
      </div>
    </div>
  );
}
