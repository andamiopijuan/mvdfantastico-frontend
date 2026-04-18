import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import type { EditionSummary } from "@/lib/types";
import EditionCard from "@/components/archive/EditionCard";

interface ArchivePreviewProps {
  editions: EditionSummary[];
}

export default function ArchivePreview({ editions }: ArchivePreviewProps) {
  const t = useTranslations("home.archive_preview");
  const locale = useLocale();

  const preview = editions
    .filter((e) => e.has_legacy)
    .sort((a, b) => b.year - a.year)
    .slice(0, 4);

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-6">
          <div>
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-plasma mb-3 font-medium">
              Filmoteca
            </p>
            <h2
              className="font-display text-text-primary leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {t("title")}
            </h2>
          </div>
          <Link
            href={`/${locale}/archivo`}
            className="font-sans text-[10px] tracking-widest uppercase text-text-secondary hover:text-plasma transition-colors font-medium"
          >
            {t("view_all")} &#x2192;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {preview.map((edition) => (
            <EditionCard key={edition.id} edition={edition} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
