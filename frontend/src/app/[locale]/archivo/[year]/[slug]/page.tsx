export async function generateStaticParams() {
  return [];
}

import { getEditionByYear } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: { locale: string; year: string; slug: string };
}

type FeatureFilm = {
  slug: string;
  title: string;
  country: string;
  year: number;
  duration: number;
  director: string;
  poster: string;
  trailer_url: string | null;
  credits: string;
  synopsis: string | null;
  review: string | null;
};

function isRealLegacyFilmRecord(record: unknown): record is Record<string, any> {
  if (!record || typeof record !== "object") return false;

  const film = record as Record<string, any>;
  const slug = typeof film.slug === "string" ? film.slug.trim() : "";
  const title = typeof film.title === "string" ? film.title.trim() : "";

  if (!slug || !title) return false;

  const realSignals = [
    film.director,
    film.country,
    film.poster,
    film.synopsis,
    film.review,
    film.duration,
    film.runtime,
    film.year,
    film.original_title,
    film.trailer_url,
    film.trailer,
    film.image,
    film.still,
    film.credits,
  ];

  return realSignals.some((value) => {
    if (typeof value === "string") return value.trim().length > 0;
    if (typeof value === "number") return Number.isFinite(value);
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === "object") return true;
    return false;
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findFilmInLegacyJson(legacyJson: Record<string, any>, slug: string): { film: FeatureFilm; sectionTitle: string } | null {
  const sections = legacyJson.sections ?? [];
  for (const section of sections) {
    if (section.type === "features" && Array.isArray(section.films)) {
      const film = (section.films as FeatureFilm[]).filter(isRealLegacyFilmRecord).find((f) => f.slug === slug);
      if (film) return { film, sectionTitle: section.name as string };
    }
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const year = parseInt(params.year, 10);
  try {
    const edition = await getEditionByYear(year);
    if (!edition.legacy_json) return { title: "Película — Montevideo Fantástico" };
    const result = findFilmInLegacyJson(edition.legacy_json, params.slug);
    if (!result) return { title: "Película — Montevideo Fantástico" };
    const { film } = result;
    return {
      title: `${film.title} — Montevideo Fantástico ${edition.number ?? ""}`.trim(),
      description: film.synopsis ?? undefined,
    };
  } catch {
    return { title: "Película — Montevideo Fantástico" };
  }
}

export default async function FilmDetailPage({ params }: PageProps) {
  const { locale, year, slug } = params;
  const yearInt = parseInt(year, 10);

  const edition = await getEditionByYear(yearInt).catch(() => null);
  if (!edition || !edition.legacy_json) notFound();

  const result = findFilmInLegacyJson(edition.legacy_json, slug);
  if (!result) notFound();

  const { film, sectionTitle } = result;
  const editionLabel = edition.number ? `MVF ${edition.number}` : `MVF · ${year}`;

  return (
    <div className="container-wide section-padding pb-32">
      {/* Breadcrumb */}
      <nav className="mb-12 flex items-center gap-2 text-xs uppercase tracking-widest text-text-muted">
        <Link href={`/${locale}/archivo`} className="hover:text-plasma transition-colors">
          Archivo
        </Link>
        <span className="opacity-30">/</span>
        <Link href={`/${locale}/archivo/${year}`} className="hover:text-plasma transition-colors">
          {editionLabel} · {year}
        </Link>
        <span className="opacity-30">/</span>
        <span className="text-text-tertiary truncate max-w-[260px]">{film.title}</span>
      </nav>

      <div className="grid md:grid-cols-[320px_1fr] gap-12 items-start">
        {/* Poster */}
        <div
          className="overflow-hidden flex-shrink-0"
          style={{ border: "1px solid rgba(0,212,255,0.15)", boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
        >
          {film.poster ? (
            <Image
              src={film.poster}
              alt={film.title}
              width={320}
              height={480}
              style={{ width: "100%", height: "auto", display: "block", objectFit: "contain", imageRendering: "auto" }}
              sizes="(max-width: 768px) 100vw, 320px"
              priority
            />
          ) : (
            <div style={{ width: "320px", height: "480px", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(ellipse at 50% 60%, rgba(162,89,247,0.15) 0%, transparent 70%)" }}>
              <span className="font-display text-center p-6 leading-tight" style={{ fontSize: "1.5rem", color: "transparent", WebkitTextStroke: "1px rgba(0,212,255,0.4)" }}>{film.title}</span>
            </div>
          )}
        </div>

        {/* Info column */}
        <div>
          {/* Section tag */}
          <p className="text-xs uppercase tracking-widest text-plasma mb-4">
            {sectionTitle} · {editionLabel}
          </p>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl text-white leading-none mb-8">
            {film.title}
          </h1>

          {/* Metadata */}
          <dl className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 mb-10 max-w-lg">
            {film.director && (
              <>
                <dt className="text-text-muted uppercase tracking-widest text-[11px] self-start pt-0.5">Dirección</dt>
                <dd className="text-white text-base">{film.director}</dd>
              </>
            )}
            {film.country && (
              <>
                <dt className="text-text-muted uppercase tracking-widest text-[11px] self-start pt-0.5">País</dt>
                <dd className="text-white text-base">{film.country}</dd>
              </>
            )}
            {film.year && (
              <>
                <dt className="text-text-muted uppercase tracking-widest text-[11px] self-start pt-0.5">Año</dt>
                <dd className="text-white text-base">{film.year}</dd>
              </>
            )}
            {film.duration && (
              <>
                <dt className="text-text-muted uppercase tracking-widest text-[11px] self-start pt-0.5">Duración</dt>
                <dd className="text-white text-base">{film.duration} min</dd>
              </>
            )}
          </dl>

          {/* Synopsis */}
          {film.synopsis && (
            <div className="mb-10 max-w-prose">
              <p className="text-xs uppercase tracking-widest text-plasma mb-4">Sinopsis</p>
              <p className="text-text-secondary text-base leading-loose">{film.synopsis}</p>
            </div>
          )}

          {/* Review / Festival note */}
          {film.review && (
            <div className="max-w-prose border-l-2 pl-6" style={{ borderColor: "rgba(0,212,255,0.30)" }}>
              <p className="text-xs uppercase tracking-widest text-plasma mb-1">
                Nota del festival
              </p>
              <p className="text-[11px] text-text-muted mb-4 uppercase tracking-widest">
                Texto: Alejandro Yamgotchian
              </p>
              <p className="text-text-secondary text-base leading-loose italic">{film.review}</p>
            </div>
          )}

          {/* Credits */}
          {film.credits && (
            <p className="text-sm text-text-muted mt-10 pt-8 border-t border-white/10 leading-relaxed max-w-prose">
              {film.credits}
            </p>
          )}
        </div>
      </div>

      {/* Trailer */}
      {film.trailer_url && (
        <div className="mt-20">
          <p className="text-xs uppercase tracking-widest text-plasma mb-5">Tráiler</p>
          <div className="relative w-full max-w-3xl" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={film.trailer_url}
              title={`Tráiler — ${film.title}`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
