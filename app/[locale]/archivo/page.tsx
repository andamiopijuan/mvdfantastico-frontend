import { getEditions } from "@/lib/api";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { EditionSummary } from "@/lib/types";

function toRoman(n: number): string {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let result = "";
  for (let i = 0; i < vals.length; i++) {
    while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
  }
  return result;
}

export const metadata: Metadata = {
  title: "Ediciones anteriores — Montevideo Fantástico",
};

function EditionCard({ edition, locale, currentLabel }: { edition: EditionSummary; locale: string; currentLabel: string }) {
  const dateRange = `${new Date(edition.start_date).toLocaleDateString(locale, { day: "numeric", month: "short" })} \u2014 ${new Date(edition.end_date).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}`;

  return (
    <Link
      href={`/${locale}/archivo/${edition.year}`}
      className="group block overflow-hidden border border-white/10 hover:border-plasma/60 transition-colors duration-300"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-black overflow-hidden">
        {edition.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={edition.poster}
            alt={edition.name}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-elevated"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(162,89,247,0.12) 0%, transparent 70%)' }}>
            <span className="font-display" style={{ fontSize: '4.5rem', color: 'transparent', WebkitTextStroke: '1px rgba(0,212,255,0.18)' }}>MVF {toRoman(edition.number)}</span>
          </div>
        )}
        {/* Edition identity overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <span className="font-display text-2xl text-white leading-none">MVF {toRoman(edition.number)}</span>
        </div>
        {/* Current badge */}
        {edition.is_current && (
          <span className="absolute top-3 right-3 text-void text-[10px] uppercase tracking-widest px-2 py-1" style={{ background: 'linear-gradient(135deg, #00d4ff, #a259f7)' }}>
            {currentLabel}
          </span>
        )}
      </div>
      {/* Info */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-plasma mb-1">
          {edition.year}
        </p>
        <p className="text-sm text-text-secondary">{dateRange}</p>
        {edition.work_count > 0 && (
          <p className="text-xs text-text-tertiary mt-1">{edition.work_count} obras</p>
        )}
      </div>
    </Link>
  );
}

export default async function ArchivePage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "archive" });

  // Only show editions that have a detail page (legacy_json for past editions, or is_current)
  let editions: EditionSummary[] = [];
  try {
    const res = await getEditions();
    // Deduplicate by edition number: if two entries share a number, prefer the non-legacy one
    const byNumber = new Map<number, EditionSummary>();
    for (const e of res.results) {
      const existing = byNumber.get(e.number);
      // Prefer the entry that has a poster; if both or neither do, keep first seen
      if (!existing || (!existing.poster && e.poster)) byNumber.set(e.number, e);
    }
    editions = Array.from(byNumber.values()).sort((a, b) => b.year - a.year);
  } catch {
    editions = [];
  }

  return (
    <div className="container-wide section-padding">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-plasma mb-4">{t("explore")}</p>
        <h1 className="font-display text-5xl md:text-7xl text-white mb-4">
          {t("heading")}
        </h1>
        <p className="text-text-secondary text-lg">
          {t("subtitle")}
        </p>
      </div>

      {/* Archive in-progress notice */}
      <div
        className="mb-12"
        style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(162,89,247,0.09) 100%)",
          border: "1px solid rgba(0,212,255,0.22)",
          borderLeft: "4px solid #00d4ff",
        }}
      >
        <div className="px-8 py-7">
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-plasma font-medium mb-3">
            {t("wip_label")}
          </p>
          <p className="font-sans text-sm text-text-secondary leading-relaxed font-light max-w-2xl">
            {t("wip")}
          </p>
        </div>
      </div>

      {/* Grid */}
      {editions.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {editions.map((edition) => (
            <EditionCard key={edition.id} edition={edition} locale={locale} currentLabel={t("current_label")} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center text-text-secondary">
          <p className="font-display text-3xl mb-2">{t("heading")}</p>
          <p className="text-sm">{t("subtitle")}</p>
        </div>
      )}

    </div>
  );
}

