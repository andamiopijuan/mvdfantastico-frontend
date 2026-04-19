import { getWorkById, getEditions, getWorksForEdition } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SECTION_LABELS } from "@/lib/types";

interface PageProps {
  params: { locale: string; id: string };
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const res = await getEditions();
    const ids = new Set<string>();
    for (const edition of res.results) {
      try {
        const works = await getWorksForEdition(edition.year);
        for (const work of works.results) {
          ids.add(String(work.id));
        }
      } catch { /* skip */ }
    }
    return Array.from(ids).map((id) => ({ id }));
  } catch {
    return [];
  }
}
export const dynamicParams = false;


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const work = await getWorkById(Number(params.id));
    return { title: `${work.title} — Montevideo Fantástico` };
  } catch {
    return { title: "Obra — Montevideo Fantástico" };
  }
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { locale, id } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "archive" });

  let work;
  try {
    work = await getWorkById(Number(id));
  } catch {
    return (
      <div className="container-wide section-padding text-center py-32">
        <p className="font-display text-4xl text-white/30">OBRA NO ENCONTRADA</p>
        <Link href={`/${locale}/archivo`} className="text-plasma text-sm mt-4 inline-block hover:underline">
          {t("back_link")}
        </Link>
      </div>
    );
  }

  const synopsis =
    locale === "en"
      ? work.synopsis_en || work.synopsis_es
      : locale === "pt"
      ? work.synopsis_pt || work.synopsis_es
      : work.synopsis_es;

  return (
    <div className="container-wide section-padding pb-24">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-text-muted">
        <Link href={`/${locale}/archivo`} className="hover:text-plasma transition-colors">
          {t("back_link")}
        </Link>
        <span className="opacity-30">/</span>
        <Link
          href={`/${locale}/archivo/${work.edition_year}`}
          className="hover:text-plasma transition-colors"
        >
          MVF {work.edition_year}
        </Link>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
        {/* Still / poster */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{ aspectRatio: "2/3", border: "1px solid rgba(0,212,255,0.12)" }}
        >
          {work.still ? (
            <Image
              src={work.still}
              alt={work.title}
              fill
              className="object-cover"
              sizes="300px"
              priority
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-6"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 65%, rgba(162,89,247,0.15) 0%, transparent 70%)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.022) 3px, rgba(0,212,255,0.022) 4px)",
                }}
              />
              <span
                className="font-display text-center leading-tight relative z-10"
                style={{
                  fontSize: "clamp(1rem, 4vw, 1.5rem)",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(0,212,255,0.35)",
                  textShadow: "0 0 24px rgba(0,212,255,0.12)",
                }}
              >
                {work.title}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-widest text-plasma mb-3">
            {SECTION_LABELS[work.section]} · MVF {work.edition_year}
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white leading-none mb-2">
            {work.title}
          </h1>
          {work.original_title && work.original_title !== work.title && (
            <p className="text-lg text-text-tertiary italic mb-4">{work.original_title}</p>
          )}

          {/* Metadata grid */}
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm mt-6 mb-8 max-w-md">
            {work.director && (
              <>
                <dt className="text-text-muted uppercase tracking-widest text-[10px]">Dirección</dt>
                <dd className="text-white">{work.director}</dd>
              </>
            )}
            {work.country && (
              <>
                <dt className="text-text-muted uppercase tracking-widest text-[10px]">País</dt>
                <dd className="text-white">{work.country}</dd>
              </>
            )}
            {work.production_year && (
              <>
                <dt className="text-text-muted uppercase tracking-widest text-[10px]">Año</dt>
                <dd className="text-white">{work.production_year}</dd>
              </>
            )}
            {work.runtime && (
              <>
                <dt className="text-text-muted uppercase tracking-widest text-[10px]">Duración</dt>
                <dd className="text-white">{work.runtime} min</dd>
              </>
            )}
            {work.language && (
              <>
                <dt className="text-text-muted uppercase tracking-widest text-[10px]">Idioma</dt>
                <dd className="text-white">{work.language}</dd>
              </>
            )}
            {work.cast && (
              <>
                <dt className="text-text-muted uppercase tracking-widest text-[10px]">Reparto</dt>
                <dd className="text-white">{work.cast}</dd>
              </>
            )}
            {work.producers && (
              <>
                <dt className="text-text-muted uppercase tracking-widest text-[10px]">Producción</dt>
                <dd className="text-white">{work.producers}</dd>
              </>
            )}
          </dl>

          {/* Synopsis */}
          {synopsis && (
            <div className="max-w-prose">
              <p className="text-[10px] uppercase tracking-widest text-plasma mb-3">Sinopsis</p>
              <p className="text-text-secondary leading-relaxed">{synopsis}</p>
            </div>
          )}

          {/* Screenings */}
          {work.screenings && work.screenings.length > 0 && (
            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-widest text-plasma mb-4">Funciones</p>
              <div className="space-y-3">
                {work.screenings.map((s) => (
                  <div
                    key={s.id}
                    className="flex gap-4 items-start border-b border-white/10 pb-3 last:border-0"
                  >
                    <span className="font-display text-xl text-white w-12 text-right flex-shrink-0">
                      {s.time.slice(0, 5)}
                    </span>
                    <div>
                      <p className="text-text-secondary text-sm">
                        {new Date(s.date + "T12:00:00").toLocaleDateString(locale, {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                        {s.venue_name && <> · {s.venue_name}</>}
                      </p>
                      {s.notes && <p className="text-xs text-plasma/70 mt-0.5">{s.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
