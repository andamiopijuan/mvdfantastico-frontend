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

// -- All 16 editions with confirmed year?number mapping ----------------------
// Year?edition: 2005=I, 2007=II, 2008=III, 2009=IV, 2010=V, 2011=VI,
// 2012=VII, 2013=VIII, 2015=IX, 2017=X, 2018=XI, 2019=XII,
// 2022=XIII, 2023=XIV, 2024=XV, 2026=XVI
const ALL_EDITIONS: EditionSummary[] = [
  { id: 16, name: "Montevideo Fantástico XVI",  number: 16, year: 2026, slug: "xvi",  start_date: "2026-05-08", end_date: "2026-06-28", status: "past", is_current: false, poster: "/media/archive/XVI/poster.jpg",   work_count: 0, has_legacy: true },
  { id: 15, name: "Montevideo Fantástico XV",   number: 15, year: 2024, slug: "xv",   start_date: "2024-05-01", end_date: "2024-06-30", status: "past", is_current: false, poster: "/media/archive/XV/poster.jpg",    work_count: 0, has_legacy: true },
  { id: 14, name: "Montevideo Fantástico XIV",  number: 14, year: 2023, slug: "xiv",  start_date: "2023-05-01", end_date: "2023-06-30", status: "past", is_current: false, poster: "/media/archive/XIV/poster.jpg",   work_count: 0, has_legacy: true },
  { id: 13, name: "Montevideo Fantástico XIII", number: 13, year: 2022, slug: "xiii", start_date: "2022-05-01", end_date: "2022-06-30", status: "past", is_current: false, poster: "/media/archive/XIII/poster.jpg",  work_count: 0, has_legacy: true },
  { id: 12, name: "Montevideo Fantástico XII",  number: 12, year: 2019, slug: "xii",  start_date: "2019-05-01", end_date: "2019-06-30", status: "past", is_current: false, poster: "/media/archive/XII/poster.jpg",   work_count: 0, has_legacy: true },
  { id: 11, name: "Montevideo Fantástico XI",   number: 11, year: 2018, slug: "xi",   start_date: "2018-05-01", end_date: "2018-06-30", status: "past", is_current: false, poster: "/media/archive/XI/poster.jpg",    work_count: 0, has_legacy: true },
  { id: 10, name: "Montevideo Fantástico X",    number: 10, year: 2017, slug: "x",    start_date: "2017-05-01", end_date: "2017-06-30", status: "past", is_current: false, poster: "/media/archive/X/poster.jpg",     work_count: 0, has_legacy: true },
  { id: 9,  name: "Montevideo Fantástico IX",   number: 9,  year: 2015, slug: "ix",   start_date: "2015-05-01", end_date: "2015-06-30", status: "past", is_current: false, poster: "/media/archive/IX/poster.jpg",    work_count: 0, has_legacy: true },
  { id: 8,  name: "Montevideo Fantástico VIII", number: 8,  year: 2013, slug: "viii", start_date: "2013-05-01", end_date: "2013-06-30", status: "past", is_current: false, poster: "/media/archive/VIII/poster.jpg",  work_count: 0, has_legacy: true },
  { id: 7,  name: "Montevideo Fantástico VII",  number: 7,  year: 2012, slug: "vii",  start_date: "2012-05-01", end_date: "2012-06-30", status: "past", is_current: false, poster: "/media/archive/VII/poster.jpg",   work_count: 0, has_legacy: true },
  { id: 6,  name: "Montevideo Fantástico VI",   number: 6,  year: 2011, slug: "vi",   start_date: "2011-05-01", end_date: "2011-06-30", status: "past", is_current: false, poster: "/media/archive/VI/poster.jpg",    work_count: 0, has_legacy: true },
  { id: 5,  name: "Montevideo Fantástico V",    number: 5,  year: 2010, slug: "v",    start_date: "2010-05-01", end_date: "2010-06-30", status: "past", is_current: false, poster: "/media/archive/V/poster.jpg",     work_count: 0, has_legacy: true },
  { id: 4,  name: "Montevideo Fantástico IV",   number: 4,  year: 2009, slug: "iv",   start_date: "2009-05-01", end_date: "2009-06-30", status: "past", is_current: false, poster: "/media/archive/IV/poster.jpg",    work_count: 0, has_legacy: true },
  { id: 3,  name: "Montevideo Fantástico III",  number: 3,  year: 2008, slug: "iii",  start_date: "2008-05-01", end_date: "2008-06-30", status: "past", is_current: false, poster: "/media/archive/III/poster.jpg",   work_count: 0, has_legacy: true },
  { id: 2,  name: "Montevideo Fantástico II",   number: 2,  year: 2007, slug: "ii",   start_date: "2007-05-01", end_date: "2007-06-30", status: "past", is_current: false, poster: "/media/archive/II/poster.jpg",    work_count: 0, has_legacy: true },
  { id: 1,  name: "Montevideo Fantástico I",    number: 1,  year: 2005, slug: "i",    start_date: "2005-05-01", end_date: "2005-06-30", status: "past", is_current: false, poster: "/media/archive/I/poster.jpg",     work_count: 0, has_legacy: true },
];

function EditionCard({ edition, locale, currentLabel }: { edition: EditionSummary; locale: string; currentLabel: string }) {
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
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
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
        {edition.work_count > 0 && (
          <p className="text-xs text-text-tertiary mt-1">{edition.work_count} obras</p>
        )}
      </div>
    </Link>
  );
}

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "pt" }];
}

export default async function ArchivePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("archive");
  const locale = params.locale;

  // Use static list as base; enrich with API data if available
  let editions: EditionSummary[] = ALL_EDITIONS;
  try {
    const res = await getEditions();
    const apiByYear = new Map(res.results.map((e) => [e.year, e]));
    editions = ALL_EDITIONS.map((e) => (apiByYear.get(e.year) ?? e));
    // Also include any API-only editions not in the static list (e.g. future editions)
    res.results.forEach((e) => {
      if (!editions.find((s) => s.year === e.year)) {
        editions = [e, ...editions];
      }
    });
    editions.sort((a, b) => b.year - a.year);
  } catch {
    // API unavailable — use static list
  }

  return (
    <div className="container-wide section-padding">
      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs uppercase tracking-widest text-plasma mb-4">{t("explore")}</p>
        <h1 className="font-display text-5xl md:text-7xl text-white mb-4">
          {t("heading")}
        </h1>
        <p className="text-text-secondary text-lg">
          {t("subtitle")}
        </p>
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
