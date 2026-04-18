import {
  getCurrentEdition,
  getWorksForEdition,
  getVenuesForEdition,
  getScreeningsForEdition,
} from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import type { WorkSummary, WorkSection, Screening, Venue, Edition } from "@/lib/types";
import { SECTION_LABELS } from "@/lib/types";

export const metadata: Metadata = {
  title: "Edición Actual — Montevideo Fantástico",
};

function WorkCard({ work }: { work: WorkSummary }) {
  const hasImage = !!work.still;
  return (
    <article
      className="group relative overflow-hidden bg-elevated"
      style={{ border: "1px solid rgba(0,212,255,0.07)" }}
    >
      {/* Poster / image area */}
      <div className="relative aspect-[2/3] overflow-hidden bg-void">
        {hasImage ? (
          <Image
            src={work.still}
            alt={work.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4"
            style={{
              background:
                "radial-gradient(ellipse at 50% 65%, rgba(162,89,247,0.13) 0%, transparent 70%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.022) 3px, rgba(0,212,255,0.022) 4px)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.25) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <span
              className="font-display text-center leading-tight relative z-10"
              style={{
                fontSize: "clamp(0.75rem, 2.5vw, 1rem)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(0,212,255,0.35)",
                textShadow: "0 0 24px rgba(0,212,255,0.12)",
              }}
            >
              {work.title}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-text-muted mt-3 relative z-10">
              {work.country} · {work.runtime} min
            </span>
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(7,11,20,0.95) 0%, transparent 100%)",
          }}
        />
        <span
          className="absolute top-2 left-2 text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-void/80 text-plasma"
          style={{ border: "1px solid rgba(0,212,255,0.20)" }}
        >
          {work.country}
        </span>
      </div>
      <div className="p-3 pt-2">
        <h3 className="font-display text-sm text-white leading-snug line-clamp-2 mb-0.5">
          {work.title}
        </h3>
        <p className="text-[11px] text-text-secondary">Dir. {work.director}</p>
        <p className="text-[10px] text-text-muted mt-0.5">{work.runtime} min</p>
      </div>
    </article>
  );
}

export default async function CurrentEditionPage() {
  const t = await getTranslations("edition");
  const locale = await getLocale();

  let edition: Edition;
  try {
    edition = await getCurrentEdition();
  } catch {
    return (
      <div className="container-wide section-padding">
        <p className="text-text-secondary">No hay edición activa en este momento.</p>
      </div>
    );
  }

  const [worksRes, venuesRes, screeningsRes] = await Promise.all([
    getWorksForEdition(edition.year).catch(() => ({ results: [] })),
    getVenuesForEdition(edition.year).catch(() => ({ results: [] })),
    getScreeningsForEdition(edition.year).catch(() => ({ results: [] })),
  ]);

  const works = worksRes.results;
  const allVenues = venuesRes.results;
  const screenings = screeningsRes.results;

  // Split venues: scheduled = have description, pending = "Programación a confirmar"
  const PENDING_MARKER = "Programación a confirmar";
  const scheduledVenues = allVenues.filter((v: Venue) => v.description !== PENDING_MARKER);
  const pendingVenues = allVenues.filter((v: Venue) => v.description === PENDING_MARKER);

  const worksBySection = works.reduce<Partial<Record<WorkSection, WorkSummary[]>>>((acc, w) => {
    (acc[w.section] = acc[w.section] ?? []).push(w);
    return acc;
  }, {});

  const sectionOrder: WorkSection[] = [
    "competition_int",
    "competition_nat",
    "short_competition",
    "panorama",
    "special",
    "retrospective",
    "tribute",
  ];

  const byDate = screenings.reduce<Record<string, Screening[]>>((acc, s) => {
    (acc[s.date] = acc[s.date] ?? []).push(s);
    return acc;
  }, {});
  const sortedDates = Object.keys(byDate).sort();

  const posterSrc = edition.key_visual || edition.poster || "";

  const description =
    locale === "en"
      ? edition.description_en || edition.description_es
      : locale === "pt"
      ? edition.description_pt || edition.description_es
      : edition.description_es;

  const dateRange = `${new Date(edition.start_date).toLocaleDateString(locale, { day: "numeric", month: "long" })} — ${new Date(edition.end_date).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}`;

  return (
    <div className="container-wide section-padding">
      {/* Hero */}
      <div className="grid md:grid-cols-[320px_1fr] gap-12 mb-16 items-start">
        {/* Poster — natural aspect ratio, never cropped */}
        <div style={{ border: '1px solid rgba(0,212,255,0.12)' }}>
          {posterSrc ? (
            <Image
              src={posterSrc}
              alt={edition.name}
              width={640}
              height={900}
              className="w-full h-auto block"
              style={{ display: 'block' }}
              priority
            />
          ) : (
            <div
              className="flex flex-col items-center justify-center"
              style={{
                aspectRatio: '2/3',
                background:
                  'radial-gradient(ellipse at 50% 60%, rgba(162,89,247,0.18) 0%, rgba(0,212,255,0.04) 50%, transparent 80%)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,212,255,0.03) 5px, rgba(0,212,255,0.03) 6px)',
                }}
              />
              <span
                className="font-display text-center relative z-10"
                style={{
                  fontSize: '7rem',
                  lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(0,212,255,0.22)',
                  textShadow: '0 0 60px rgba(0,212,255,0.08)',
                }}
              >
                {edition.year}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-end">
          {/* Title — use edition name directly (e.g. "Montevideo Fantástico XVI") */}
          <h1 className="font-display text-4xl md:text-6xl text-white leading-tight mb-3">{edition.name}</h1>
          <p className="text-sm text-text-tertiary mb-6">{dateRange}</p>
          {description && (
            <div
              className="border-l-2 pl-5 mb-8"
              style={{ borderColor: 'rgba(0,212,255,0.25)' }}
            >
              {description.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-text-secondary leading-relaxed font-light mb-3 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary mb-6">
            {works.length > 0 && (
              <span><strong className="text-white font-display text-2xl">{works.length}</strong> {t("obras_count")}</span>
            )}
            {allVenues.length > 0 && (
              <span><strong className="text-white font-display text-2xl">{allVenues.length}</strong> {t("sedes_count")}</span>
            )}
          </div>
          {/* CTA: only show if submission_url exists */}
          {edition.submission_url ? (
            <a
              href={edition.submission_url}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-void text-xs uppercase tracking-widest px-5 py-2.5 transition-colors font-bold"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #a259f7)' }}
            >
              {t("call_open")}
            </a>
          ) : null}
        </div>
      </div>

      {/* Venues — API data path */}
      {allVenues.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl text-white mb-8 border-b border-white/20 pb-4">
            {t("venues_heading")}
          </h2>

          {scheduledVenues.length > 0 && (
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-widest text-plasma mb-5">
                {t("venues_confirmed")}
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {scheduledVenues.map((v: Venue) => (
                  <div key={v.id} className="p-5" style={{ border: '1px solid rgba(0,212,255,0.10)' }}>
                    <h3 className="font-display text-xl text-white mb-1">{v.name}</h3>
                    {v.address && <p className="text-xs text-text-muted mb-2">{v.address}</p>}
                    {v.description && <p className="text-sm text-plasma font-mono tracking-wide">{v.description}</p>}
                    {v.map_url && (
                      <a href={v.map_url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-text-secondary hover:text-plasma mt-3 inline-block transition-colors">
                        {t("map_link")} →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {pendingVenues.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-text-muted mb-5">
                {t("venues_pending_heading")}
              </p>
              <div className="flex flex-wrap gap-3">
                {pendingVenues.map((v: Venue) => (
                  <div key={v.id} className="px-4 py-3" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-sm text-text-secondary">{v.name}</p>
                    {v.address && <p className="text-[10px] text-text-muted mt-0.5">{v.address}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Special Events — always shown for current edition */}
      <section className="mt-16">
        <h2 className="font-display text-3xl text-white mb-8 border-b border-white/20 pb-4">
          {t("special_events_heading")}
        </h2>
        <div
          className="flex flex-col sm:flex-row gap-6 p-8"
          style={{ background: 'linear-gradient(135deg, rgba(162,89,247,0.08) 0%, rgba(0,212,255,0.05) 100%)', border: '1px solid rgba(162,89,247,0.20)' }}
        >
          {/* Trophy icon */}
          <div
            className="flex-shrink-0 w-16 h-16 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(162,89,247,0.25), rgba(0,212,255,0.15))', border: '1px solid rgba(162,89,247,0.35)' }}
          >
            <span className="text-2xl">🏆</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-nova mb-2">
              {t("special_events_heading")}
            </p>
            <h3 className="font-display text-2xl text-white mb-1">{t("awards_ceremony_title")}</h3>
            <p className="text-sm text-plasma font-mono tracking-wide mb-1">{t("awards_ceremony_date")}</p>
            <p className="text-sm text-text-secondary">{t("awards_ceremony_venue")}</p>
            <p className="text-xs text-text-muted mt-3 max-w-lg leading-relaxed">{t("awards_ceremony_desc")}</p>
          </div>
        </div>
      </section>

      {/* Works section hidden until real data is available */}

      {/* Works by section — only if any exist */}
      {works.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl text-white mb-8 border-b border-white/20 pb-4">
            {t("works_heading")}
          </h2>
          {sectionOrder
            .filter((s) => (worksBySection[s]?.length ?? 0) > 0)
            .map((section) => (
              <div key={section} className="mb-12">
                <h3 className="text-xs uppercase tracking-widest text-plasma mb-6">{SECTION_LABELS[section]}</h3>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {worksBySection[section]!.map((work) => <WorkCard key={work.id} work={work} />)}
                </div>
              </div>
            ))}
        </section>
      )}

      {/* Screenings — only if any exist */}
      {screenings.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-3xl text-white mb-8 border-b border-white/20 pb-4">
            {t("screenings_heading")}
          </h2>
          {sortedDates.map((date) => {
            const label = new Date(date + "T12:00:00").toLocaleDateString(locale, {
              weekday: "long",
              day: "numeric",
              month: "long",
            });
            return (
              <div key={date} className="mb-10">
                <h3 className="text-xs uppercase tracking-widest text-plasma mb-4">{label}</h3>
                {byDate[date].map((s) => (
                  <div key={s.id} className="flex gap-4 items-start border-b border-white/10 py-3 last:border-0">
                    <span className="font-display text-2xl text-white w-14 text-right flex-shrink-0">
                      {s.time.slice(0, 5)}
                    </span>
                    <div>
                      <p className="text-white font-medium">{s.work.title}</p>
                      <p className="text-sm text-text-secondary">
                        {s.work.director}
                        {s.venue_name && <> · {s.venue_name}</>}
                      </p>
                      {s.notes && <p className="text-xs text-plasma/70 mt-0.5">{s.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

