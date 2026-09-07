import {
  getEditions,
  getEditionByYear,
  getWorksForEdition,
  getVenuesForEdition,
  getScreeningsForEdition,
  getAwardWinnersForEdition,
} from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type {
  WorkSummary,
  WorkSection,
  Screening,
  AwardWinner,
  Venue,
} from "@/lib/types";
import { SECTION_LABELS } from "@/lib/types";

const NO_EDITION_YEARS = new Set<number>([2025]);
const BLOCKED_DYNAMIC_YEARS = new Set<number>([2025, 2026]);
const isAllowedDynamicYear = (year: number) => !BLOCKED_DYNAMIC_YEARS.has(year);

export async function generateStaticParams() {
  try {
    const res = await getEditions();
    return res.results
      .filter((e) => (e.has_legacy || e.is_current) && isAllowedDynamicYear(Number(e.year)) && !NO_EDITION_YEARS.has(Number(e.year)))
      .map((e) => ({ year: String(e.year) }));
  } catch {
    // Fallback to known years if API is unavailable during build; keep unsupported years excluded.
    return [2017, 2022, 2023, 2024].map((y) => ({ year: String(y) }));
  }
}
export const dynamicParams = true;

interface PageProps {
  params: { locale: string; year: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const year = parseInt(params.year, 10);
  try {
    const edition = await getEditionByYear(year);
    return { title: `${edition.name} — Montevideo Fantástico` };
  } catch {
    return { title: "Edición — Montevideo Fantástico" };
  }
}

// ── Shared sub-components ────────────────────────────────────────────────────

function WorkCard({ work, locale }: { work: WorkSummary; locale: string }) {
  const hasImage = !!work.still;
  return (
    <Link href={`/${locale}/works/${work.id}`} className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-plasma">
      <article className="group relative overflow-hidden bg-elevated cursor-pointer" style={{ border: "1px solid rgba(0,212,255,0.07)" }}>
        <div className="relative aspect-[2/3] overflow-hidden bg-void">
          {hasImage ? (
            <Image src={work.still} alt={work.title} fill className="object-contain group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4" style={{ background: "radial-gradient(ellipse at 50% 65%, rgba(162,89,247,0.13) 0%, transparent 70%)" }}>
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.022) 3px, rgba(0,212,255,0.022) 4px)" }} />
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.25) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <span className="font-display text-center leading-tight relative z-10" style={{ fontSize: "clamp(0.75rem, 2.5vw, 1rem)", color: "transparent", WebkitTextStroke: "1px rgba(0,212,255,0.35)", textShadow: "0 0 24px rgba(0,212,255,0.12)" }}>{work.title}</span>
              <span className="text-[9px] uppercase tracking-widest text-text-muted mt-3 relative z-10">{work.country} · {work.runtime} min</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(7,11,20,0.95) 0%, transparent 100%)" }} />
          <span className="absolute top-2 left-2 text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-void/80 text-plasma" style={{ border: "1px solid rgba(0,212,255,0.20)" }}>{work.country}</span>
        </div>
        <div className="p-3 pt-2">
          <h3 className="font-display text-sm text-white leading-snug line-clamp-2 mb-0.5">{work.title}</h3>
          {work.original_title && work.original_title !== work.title && <p className="text-[10px] text-text-tertiary italic leading-tight line-clamp-1 mb-1">{work.original_title}</p>}
          <p className="text-[11px] text-text-secondary">Dir. {work.director}</p>
          <p className="text-[10px] text-text-muted mt-0.5">{work.runtime} min</p>
        </div>
      </article>
    </Link>
  );
}

function ScheduleSection({ screenings, locale, te }: { screenings: Screening[]; locale: string; te: (key: string) => string }) {
  const byDate = screenings.reduce<Record<string, Screening[]>>((acc, s) => { (acc[s.date] = acc[s.date] ?? []).push(s); return acc; }, {});
  const sortedDates = Object.keys(byDate).sort();
  return (
    <section className="mt-16">
      <h2 className="font-display text-3xl text-white mb-8 border-b border-white/20 pb-4">{te("screenings_heading")}</h2>
      {sortedDates.map((date) => {
        const label = new Date(date + "T12:00:00").toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
        return (
          <div key={date} className="mb-10">
            <h3 className="text-xs uppercase tracking-widest text-plasma mb-4">{label}</h3>
            {byDate[date].map((s) => (
              <div key={s.id} className="flex gap-4 items-start border-b border-white/10 py-3 last:border-0">
                <span className="font-display text-2xl text-white w-14 text-right flex-shrink-0">{s.time.slice(0, 5)}</span>
                <div>
                  <p className="text-white font-medium">{s.work.title}</p>
                  <p className="text-sm text-text-secondary">{s.work.director}{s.venue_name && <> · {s.venue_name}</>}</p>
                  {s.notes && <p className="text-xs text-plasma/70 mt-0.5">{s.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}

function AwardsSection({ winners, te }: { winners: AwardWinner[]; te: (key: string) => string }) {
  const byCategory: Record<string, AwardWinner[]> = {};
  for (const w of winners) { const k = String(w.category); (byCategory[k] = byCategory[k] ?? []).push(w); }
  return (
    <section className="mt-16">
      <h2 className="font-display text-3xl text-white mb-8 border-b border-white/20 pb-4">{te("awards_heading")}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(byCategory).map((items) => (
          <div key={items[0].category} className="border border-white/10 p-5">
            <p className="text-[10px] uppercase tracking-widest text-plasma mb-3">{items[0].category_name}</p>
            {items.map((w) => (
              <div key={w.id} className="mb-2">
                <p className="text-white font-medium">{w.work_title ?? "—"}</p>
                {w.work_director && <p className="text-sm text-text-secondary">{w.work_director}</p>}
                {w.is_special_mention && <p className="text-xs text-text-tertiary">Mención especial</p>}
                {w.notes && <p className="text-xs text-text-tertiary">{w.notes}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

type FeatureFilm = { slug: string; title: string; country: string; year: number; duration: number; director: string; poster: string; trailer_url: string | null; credits: string; synopsis: string | null; review: string | null; };
type ShortFilm = { title: string; country: string | null; duration: number; director: string; synopsis?: string; };
type CatalogFilm = { title: string; director?: string; country: string | null; duration: number | null; };

function normalizeLegacyFilmTitle(value?: string | null): string {
  if (typeof value !== "string") return "";
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function normalizeLegacySignatureValue(value: unknown): string {
  if (typeof value === "string") return value.toLowerCase().replace(/\s+/g, " ").trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map((item) => normalizeLegacySignatureValue(item)).filter(Boolean).join(" || ");
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>)
      .map((item) => normalizeLegacySignatureValue(item))
      .filter(Boolean)
      .join(" || ");
  }
  return "";
}

function getLegacySectionSignature(section: unknown): string | null {
  if (!section || typeof section !== "object") return null;

  const entry = section as Record<string, any>;
  const sectionType = normalizeLegacySignatureValue(entry.type ?? "");
  const sectionName = normalizeLegacySignatureValue(entry.name ?? entry.title ?? "");

  const parts: string[] = [
    `type:${sectionType}`,
    `name:${sectionName}`,
  ];

  if (Array.isArray(entry.films)) {
    const filmSignature = entry.films
      .map((film: unknown) => {
        if (!film || typeof film !== "object") return "";
        const filmEntry = film as Record<string, any>;
        const slug = normalizeLegacySignatureValue(filmEntry.slug ?? "");
        const title = normalizeLegacySignatureValue(filmEntry.title ?? "");
        const director = normalizeLegacySignatureValue(filmEntry.director ?? "");
        const country = normalizeLegacySignatureValue(filmEntry.country ?? "");
        const synopsis = normalizeLegacySignatureValue(filmEntry.synopsis ?? "");
        const review = normalizeLegacySignatureValue(filmEntry.review ?? "");
        return [slug, title, director, country, synopsis, review].filter(Boolean).join("::");
      })
      .filter(Boolean)
      .sort();

    if (filmSignature.length > 0) parts.push(`films:${filmSignature.join(";;")}`);
  }

  if (Array.isArray(entry.awards)) {
    const awardSignature = entry.awards
      .map((award: unknown) => {
        if (!award || typeof award !== "object") return "";
        const awardEntry = award as Record<string, any>;
        const awardName = normalizeLegacySignatureValue(awardEntry.name ?? "");
        const recipient = normalizeLegacySignatureValue(awardEntry.recipient ?? "");
        const film = normalizeLegacySignatureValue(awardEntry.film ?? awardEntry.title ?? "");
        const title = normalizeLegacySignatureValue(awardEntry.title ?? "");
        const citation = normalizeLegacySignatureValue(awardEntry.citation ?? "");
        return [awardName, recipient, film, title, citation].filter(Boolean).join("::");
      })
      .filter(Boolean)
      .sort();

    if (awardSignature.length > 0) parts.push(`awards:${awardSignature.join(";;")}`);
  }

  if (Array.isArray(entry.categories)) {
    const categorySignature = entry.categories
      .map((category: unknown) => {
        if (!category || typeof category !== "object") return "";
        const categoryEntry = category as Record<string, any>;
        const categoryName = normalizeLegacySignatureValue(categoryEntry.name ?? "");
        const filmTitles = Array.isArray(categoryEntry.films)
          ? categoryEntry.films
              .map((film: unknown) => {
                if (!film || typeof film !== "object") return "";
                const filmEntry = film as Record<string, any>;
                return normalizeLegacySignatureValue(filmEntry.title ?? filmEntry.name ?? "");
              })
              .filter(Boolean)
              .sort()
          : [];
        return [categoryName, ...filmTitles].filter(Boolean).join("::");
      })
      .filter(Boolean)
      .sort();

    if (categorySignature.length > 0) parts.push(`categories:${categorySignature.join(";;")}`);
  }

  for (const field of ["text", "html", "content", "description", "summary", "synopsis", "review", "citation", "jury"]) {
    if (field in entry && entry[field] !== undefined && entry[field] !== null) {
      const normalizedValue = normalizeLegacySignatureValue(entry[field]);
      if (normalizedValue) parts.push(`${field}:${normalizedValue}`);
    }
  }

  return parts.join("|");
}

function getUniqueLegacySections(sections: any[]): any[] {
  const unique: any[] = [];
  const seen = new Set<string>();

  for (const section of sections) {
    const signature = getLegacySectionSignature(section);
    if (!signature) {
      unique.push(section);
      continue;
    }

    if (seen.has(signature)) continue;
    seen.add(signature);
    unique.push(section);
  }

  return unique;
}

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

function JsonFeatureCard({ film, locale, year = 2017 }: { film: FeatureFilm; locale: string; year?: number }) {
  return (
    <Link href={`/${locale}/archivo/${year}/${film.slug}`} className="block group focus:outline-none focus-visible:ring-1 focus-visible:ring-plasma">
      <article className="relative overflow-hidden bg-elevated cursor-pointer" style={{ border: "1px solid rgba(0,212,255,0.07)" }}>
        <div className="relative aspect-[2/3] overflow-hidden bg-void">
          {film.poster ? (
            <Image src={film.poster} alt={film.title} fill className="object-contain group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3" style={{ background: "radial-gradient(ellipse at 50% 65%, rgba(162,89,247,0.13) 0%, transparent 70%)" }}>
              <span className="font-display text-center leading-tight" style={{ fontSize: "clamp(0.65rem,2vw,0.85rem)", color: "transparent", WebkitTextStroke: "1px rgba(0,212,255,0.35)" }}>{film.title}</span>
              <span className="text-[9px] uppercase tracking-widest text-text-muted mt-2">{film.country}</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(7,11,20,0.95) 0%, transparent 100%)" }} />
          <span className="absolute top-2 left-2 text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-void/80 text-plasma" style={{ border: "1px solid rgba(0,212,255,0.20)" }}>{film.country}</span>
        </div>
        <div className="p-3 pt-2">
          <h3 className="font-display text-sm text-white leading-snug line-clamp-2 mb-0.5">{film.title}</h3>
          <p className="text-[11px] text-text-secondary">Dir. {film.director}</p>
          <p className="text-[10px] text-text-muted mt-0.5">{film.year} · {film.duration} min</p>
        </div>
      </article>
    </Link>
  );
}

// ── Legacy Edition Renderer ──────────────────────────────────────────────────
// Renders an edition page from legacy_json stored in the DB.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LegacyEditionRenderer({ data, locale, year, backHref, backLabel, featuresLabel, competitionShortsLabel, venuesLabel }: { data: Record<string, any>; locale: string; year: number; backHref: string; backLabel: string; featuresLabel: string; competitionShortsLabel: string; venuesLabel: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ed = data.edition ?? {} as Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorial = data.editorial as { title: string; author: string; content: string[] } | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const awards: any[] = data.awards ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections: any[] = data.sections ?? [];
  const uniqueSections = getUniqueLegacySections(sections);

  // Build legacy film lookup map from real feature films in this edition.
  const awardPosterMap = new Map<string, string>();
  const awardFilmLookup = new Map<string, { slug: string; poster?: string }>();

  for (const sec of uniqueSections) {
    if (sec.type !== "features" || !Array.isArray(sec.films)) continue;

    for (const f of (sec.films as FeatureFilm[]).filter(isRealLegacyFilmRecord)) {
      if (!f.title || !f.slug) continue;

      const titleVariants = new Set<string>();
      titleVariants.add(f.title.trim());
      if (f.title.includes(" / ")) {
        for (const part of f.title.split(" / ")) {
          const trimmed = part.trim();
          if (trimmed) titleVariants.add(trimmed);
        }
      }
      if (f.title.includes(" (")) {
        const trimmed = f.title.split(" (")[0].trim();
        if (trimmed) titleVariants.add(trimmed);
      }

      for (const variant of Array.from(titleVariants)) {
        const normalized = normalizeLegacyFilmTitle(variant);
        if (!normalized) continue;
        if (f.poster) awardPosterMap.set(normalized, f.poster);
        awardFilmLookup.set(normalized, { slug: f.slug, poster: f.poster || undefined });
      }
    }
  }

  const getAwardPoster = (filmName?: string): string | null => {
    if (!filmName) return null;
    const normalized = normalizeLegacyFilmTitle(filmName);
    return normalized ? (awardPosterMap.get(normalized) ?? null) : null;
  };

  const getAwardFilmMatch = (filmName?: string | null) => {
    if (!filmName) return null;
    const normalized = normalizeLegacyFilmTitle(filmName);
    return normalized ? awardFilmLookup.get(normalized) ?? null : null;
  };

  const featureCount = uniqueSections
    .filter((s) => s.type === "features")
    .reduce((n, s) => n + (Array.isArray(s.films) ? s.films.filter(isRealLegacyFilmRecord).length : 0), 0);
  const shortsCount = uniqueSections
    .filter((s) => s.type === "shorts")
    .reduce((n, s) => n + (Array.isArray(s.films) ? s.films.filter(isRealLegacyFilmRecord).length : 0), 0);

  return (
    <div className="container-wide section-padding pb-24">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href={backHref} className="text-xs uppercase tracking-widest text-text-muted hover:text-plasma transition-colors">
          {backLabel}
        </Link>
      </div>

      {/* Edition hero */}
      <div className="grid md:grid-cols-[340px_1fr] gap-12 mb-16 items-start">
        <div className="overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(0,212,255,0.12)" }}>
          {ed.poster && (
            <Image src={ed.poster} alt={ed.title ?? ""} width={340} height={480}
              style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
              sizes="340px" priority />
          )}
        </div>
        <div className="flex flex-col justify-end">
          <h1 className="font-display text-6xl md:text-8xl text-white leading-none mb-2">MVF {ed.roman ?? ""}</h1>
          <p className="text-2xl text-white/70 leading-none mb-3">{ed.year}</p>
          <p className="text-xl text-text-secondary mb-1">{ed.title}</p>
          {ed.dates && <p className="text-sm text-text-tertiary mb-6">{ed.dates}</p>}
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary mb-6">
            {featureCount > 0 && <span><strong className="text-white font-display text-2xl">{featureCount}</strong>{" "}{featuresLabel}</span>}
            {shortsCount > 0 && <span><strong className="text-white font-display text-2xl">{shortsCount}</strong>{" "}{competitionShortsLabel}</span>}
          </div>
          {Array.isArray(ed.venues) && ed.venues.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-plasma mb-2">{venuesLabel}</p>
              <ul className="text-sm text-text-secondary space-y-0.5">
                {(ed.venues as string[]).map((v) => <li key={v}>{v}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Editorial */}
      {editorial && Array.isArray(editorial.content) && editorial.content.length > 0 && (
        <section className="mb-16 p-8 md:p-12" style={{ border: "1px solid rgba(0,212,255,0.10)", background: "rgba(0,212,255,0.02)" }}>
          <h2 className="font-display text-3xl text-white mb-1">{editorial.title}</h2>
          <p className="text-[11px] uppercase tracking-widest text-plasma mb-8">Por {editorial.author}</p>
          <div className="space-y-5 max-w-prose">
            {editorial.content.map((p, i) => <p key={i} className="text-text-secondary leading-relaxed">{p}</p>)}
          </div>
        </section>
      )}

      {/* Awards */}
      {awards.length > 0 && (
        <section className="mb-16">
          <h2 className="font-display text-3xl text-white mb-8 border-b border-white/20 pb-4">Premios</h2>
          <div className="space-y-12">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {awards.map((block: any, bi: number) => {
              if (!block || typeof block !== "object") return null;

              const validAwards = Array.isArray(block.awards)
                ? block.awards.filter((entry: any) => entry && typeof entry === "object")
                : [];

              if (validAwards.length === 0) return null;

              const blockTitle = typeof block.section === "string" && block.section.trim().length > 0 ? block.section.trim() : null;

              return (
                <div key={bi}>
                  {blockTitle && <h3 className="font-display text-xl sm:text-2xl text-white mb-3">{blockTitle}</h3>}
                  {block.jury && (
                    <p className="text-sm text-text-secondary mb-6">
                      <span className="text-text-muted text-sm uppercase tracking-[0.18em] mr-2">Jurado:</span>{block.jury}
                    </p>
                  )}
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {validAwards.map((a: any, ai: number) => {
                      if (!a || typeof a !== "object") return null;

                      const awardName = typeof a.name === "string" ? a.name.trim() : "";
                      const awardRecipient = typeof a.recipient === "string" ? a.recipient.trim() : "";
                      const awardFilmText = typeof a.film === "string" ? a.film.trim() : "";
                      const awardTitleText = typeof a.title === "string" ? a.title.trim() : "";
                      const awardCountry = typeof a.country === "string" ? a.country.trim() : "";
                      const awardDirector = typeof a.director === "string" ? a.director.trim() : "";
                      const awardCitation = typeof a.citation === "string" ? a.citation.trim() : "";

                      if (!awardName && !awardRecipient && !awardFilmText && !awardTitleText && !awardCitation) return null;

                      const awardFilmMatch = getAwardFilmMatch(awardFilmText || awardTitleText);
                      const derivedFilmText = awardFilmText || awardTitleText;

                      const awardPoster = getAwardPoster(awardFilmText || awardTitleText);

                      return (
                        <div key={ai} className="flex gap-5 items-start p-5" style={{ border: "1px solid rgba(0,212,255,0.10)" }}>
                          {awardPoster && (
                            <div className="flex-shrink-0 w-24 overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.18)" }}>
                              <Image src={awardPoster} alt={derivedFilmText || awardName || ""} width={96} height={144} style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            {awardName && <p className="text-sm sm:text-base uppercase tracking-[0.18em] text-plasma mb-3 font-medium">{awardName}</p>}
                            {awardRecipient ? (
                              <>
                                <p className="text-white font-display text-xl leading-tight mb-1">{awardRecipient}</p>
                                {derivedFilmText && (
                                  awardFilmMatch ? (
                                    <Link href={`/${locale}/archivo/${year}/${awardFilmMatch.slug}`} className="text-sm text-text-muted italic mb-2 inline-block hover:text-plasma transition-colors">
                                      {derivedFilmText}
                                    </Link>
                                  ) : (
                                    <p className="text-sm text-text-muted italic mb-2">{derivedFilmText}</p>
                                  )
                                )}
                              </>
                            ) : (
                              derivedFilmText && (
                                awardFilmMatch ? (
                                  <Link href={`/${locale}/archivo/${year}/${awardFilmMatch.slug}`} className="text-white font-display text-xl leading-tight mb-2 block hover:text-plasma transition-colors">
                                    {derivedFilmText}
                                  </Link>
                                ) : (
                                  <p className="text-white font-display text-xl leading-tight mb-2">{derivedFilmText}</p>
                                )
                              )
                            )}
                            {(awardCountry || awardDirector) && <p className="text-sm text-text-muted mb-3">{awardCountry ?? ""}{awardDirector ? ` · Dir. ${awardDirector}` : ""}</p>}
                            {awardCitation && <p className="text-sm text-text-secondary leading-relaxed mt-3 italic border-t border-white/10 pt-3">{awardCitation}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Film sections */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {uniqueSections.map((section: any) => {
        if (section.type === "features") {
          const realFilms = Array.isArray(section.films) ? section.films.filter(isRealLegacyFilmRecord) : [];
          return (
            <section key={section.name} className="mb-16">
              <h2 className="font-display text-2xl text-white mb-6 border-b border-white/20 pb-4">{section.name}</h2>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {realFilms.map((film: FeatureFilm) => <JsonFeatureCard key={film.slug} film={film} locale={locale} year={year} />)}
              </div>
            </section>
          );
        }
        if (section.type === "shorts") {
          return (
            <section key={section.name} className="mb-16">
              <h2 className="font-display text-2xl text-white mb-6 border-b border-white/20 pb-4">{section.name}</h2>
              <div className="divide-y divide-white/10">
                {(section.films ?? []).map((film: ShortFilm, i: number) => (
                  <div key={i} className="py-4 grid md:grid-cols-[1fr_auto] gap-3 items-start">
                    <div>
                      <p className="text-white font-medium mb-0.5">{film.title}</p>
                      <p className="text-[11px] text-text-muted">Dir. {film.director}{film.country ? ` · ${film.country}` : ""}</p>
                      {film.synopsis && <p className="text-sm text-text-secondary mt-1 leading-relaxed">{film.synopsis}</p>}
                    </div>
                    {film.duration && <span className="text-[11px] text-text-muted whitespace-nowrap">{film.duration} min</span>}
                  </div>
                ))}
              </div>
            </section>
          );
        }
        if (section.type === "shorts-catalog") {
          return (
            <section key={section.name} className="mb-16">
              <h2 className="font-display text-2xl text-white mb-8 border-b border-white/20 pb-4">{section.name}</h2>
              {section.categories ? (
                <div className="space-y-10">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {section.categories.map((cat: any, ci: number) => (
                    <div key={ci}>
                      <h3 className="text-sm sm:text-base uppercase tracking-[0.18em] text-plasma mb-4 font-medium">{cat.name}</h3>
                      <div className="divide-y divide-white/10">
                        {(cat.films ?? []).map((film: CatalogFilm & { director?: string }, i: number) => (
                          <div key={i} className="py-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                            <span className="text-white text-sm">{film.title}</span>
                            {film.director && <span className="text-[11px] text-text-secondary">Dir. {film.director}</span>}
                            {(film.country || film.duration) && <span className="text-[11px] text-text-tertiary">{film.country ?? ""}{film.duration ? ` · ${film.duration}′` : ""}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {(section.films ?? []).map((film: CatalogFilm, i: number) => (
                    <div key={i} className="py-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <span className="text-white text-sm">{film.title}</span>
                      {(film.country || film.duration) && <span className="text-[11px] text-text-tertiary">{film.country ?? ""}{film.duration ? ` · ${film.duration}′` : ""}</span>}
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        }
        return null;
      })}
    </div>
  );
}

// ── Main page export ─────────────────────────────────────────────────────────

export default async function EditionArchivePage({ params }: PageProps) {
  const year = parseInt(params.year, 10);
  const locale = params.locale;

  if (BLOCKED_DYNAMIC_YEARS.has(year) || NO_EDITION_YEARS.has(year)) {
    notFound();
  }

  setRequestLocale(params.locale);
  const t = await getTranslations("archive");
  const te = await getTranslations("edition");

  const edition = await getEditionByYear(year).catch(() => null);
  if (!edition) {
    notFound();
  }

  // Past editions with legacy JSON: render rich static content from DB
  if (edition.legacy_json) {
    return (
      <LegacyEditionRenderer
        data={edition.legacy_json}
        locale={locale}
        year={year}
        backHref={`/${locale}/archivo`}
        backLabel={t("back_link")}
        featuresLabel={te("features_count")}
        competitionShortsLabel={te("competition_shorts_count")}
        venuesLabel={te("venues_heading")}
      />
    );
  }

  // Current / future editions: render from live API data
  const [worksRes, venuesRes, screeningsRes, winnersRes] = await Promise.all([
    getWorksForEdition(year).catch(() => ({ results: [] })),
    getVenuesForEdition(year).catch(() => ({ results: [] })),
    getScreeningsForEdition(year).catch(() => ({ results: [] })),
    getAwardWinnersForEdition(year).catch(() => ({ results: [] })),
  ]);

  const works = worksRes.results;
  const venues = venuesRes.results;
  const screenings = screeningsRes.results;
  const winners = winnersRes.results;

  const worksBySection = works.reduce<Partial<Record<WorkSection, WorkSummary[]>>>((acc, w) => {
    (acc[w.section] = acc[w.section] ?? []).push(w);
    return acc;
  }, {});

  const sectionOrder: WorkSection[] = [
    "competition_int", "competition_nat", "short_competition",
    "panorama", "special", "retrospective", "tribute",
  ];

  const dateRange = `${new Date(edition.start_date).toLocaleDateString(locale, { day: "numeric", month: "long" })} \u2014 ${new Date(edition.end_date).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}`;

  return (
    <div className="container-wide section-padding">
      <div className="mb-8">
        <Link href={`/${locale}/archivo`} className="text-xs uppercase tracking-widest text-text-muted hover:text-plasma transition-colors">
          {t("back_link")}
        </Link>
      </div>

      {/* Edition hero */}
      <div className="grid md:grid-cols-[340px_1fr] gap-12 mb-16 items-start">
        <div className="relative overflow-hidden" style={{ aspectRatio: "2/3", border: "1px solid rgba(0,212,255,0.12)" }}>
          {edition.key_visual || edition.poster ? (
            <Image src={edition.key_visual || edition.poster} alt={edition.name} fill className="object-contain" sizes="340px" priority />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(162,89,247,0.18) 0%, rgba(0,212,255,0.04) 50%, transparent 80%)" }}>
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,212,255,0.03) 5px, rgba(0,212,255,0.03) 6px)" }} />
              <span className="font-display text-center relative z-10" style={{ fontSize: "8rem", lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(0,212,255,0.22)", textShadow: "0 0 60px rgba(0,212,255,0.08)" }}>{edition.year}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-xs uppercase tracking-widest text-plasma mb-2">MVF {edition.number}</p>
          <h1 className="font-display text-6xl md:text-8xl text-white leading-none mb-3">{edition.year}</h1>
          <p className="text-xl text-text-secondary mb-1">{edition.name}</p>
          <p className="text-sm text-text-tertiary mb-6">{dateRange}</p>
          {edition.description_es && (
            <p className="text-text-secondary max-w-prose leading-relaxed mb-6">
              {locale === "en" ? (edition.description_en || edition.description_es) : locale === "pt" ? (edition.description_pt || edition.description_es) : edition.description_es}
            </p>
          )}
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            {works.length > 0 && <span><strong className="text-white font-display text-2xl">{works.length}</strong> {te("obras_count")}</span>}
            {venues.length > 0 && <span><strong className="text-white font-display text-2xl">{venues.length}</strong> {te("sedes_count")}</span>}
          </div>
          {edition.pdf_catalog && (
            <a href={edition.pdf_catalog} target="_blank" rel="noopener noreferrer"
              className="mt-6 self-start text-xs uppercase tracking-widest text-plasma border px-4 py-2 hover:bg-plasma/10 transition-colors"
              style={{ borderColor: "rgba(0,212,255,0.35)" }}>
              {te("catalog_pdf")}
            </a>
          )}
        </div>
      </div>

      {/* Venues */}
      {venues.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-3xl text-white mb-6 border-b border-white/20 pb-4">{te("venues_heading")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((v: Venue) => (
              <div key={v.id} className="border border-white/10 p-5">
                <h3 className="font-display text-xl text-white mb-1">{v.name}</h3>
                {v.address && <p className="text-sm text-text-secondary">{v.address}</p>}
                {v.description && <p className="text-xs text-text-tertiary mt-2">{v.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Works by section */}
      {works.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl text-white mb-8 border-b border-white/20 pb-4">{te("works_heading")}</h2>
          {sectionOrder.filter((s) => (worksBySection[s]?.length ?? 0) > 0).map((section) => (
            <div key={section} className="mb-12">
              <h3 className="text-xs uppercase tracking-widest text-plasma mb-6">{SECTION_LABELS[section]}</h3>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {worksBySection[section]!.map((work) => <WorkCard key={work.id} work={work} locale={locale} />)}
              </div>
            </div>
          ))}
        </section>
      )}

      {screenings.length > 0 && <ScheduleSection screenings={screenings} locale={locale} te={te} />}
      {winners.length > 0 && <AwardsSection winners={winners} te={te} />}
    </div>
  );
}
