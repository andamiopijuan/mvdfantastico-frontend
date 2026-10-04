import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ARCHIVE_EDITIONS, type ArchiveEdition } from "@/lib/archive";

export const metadata: Metadata = {
  title: "Ediciones anteriores — Montevideo Fantástico",
};

function EditionCard({ edition, locale }: { edition: ArchiveEdition; locale: string }) {
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
            <span className="font-display" style={{ fontSize: '4.5rem', color: 'transparent', WebkitTextStroke: '1px rgba(0,212,255,0.18)' }}>MVF {edition.roman}</span>
          </div>
        )}
        {/* Edition identity overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <span className="font-display text-2xl text-white leading-none">MVF {edition.roman}</span>
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-plasma mb-1">
          {edition.year}
        </p>
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

  const editions = ARCHIVE_EDITIONS;

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
            <EditionCard key={edition.year} edition={edition} locale={locale} />
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
