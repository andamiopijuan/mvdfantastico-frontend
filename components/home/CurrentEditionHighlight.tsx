import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import type { Edition } from "@/lib/types";

interface CurrentEditionHighlightProps {
  edition: Edition;
}

export default function CurrentEditionHighlight({ edition }: CurrentEditionHighlightProps) {
  const t = useTranslations("home.highlight");
  const locale = useLocale();

  const dateLabel = `${new Date(edition.start_date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
  })} — ${new Date(edition.end_date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;

  const posterSrc = edition.key_visual || edition.poster || "";
  const description =
    locale === "en"
      ? edition.description_en || edition.description_es
      : locale === "pt"
      ? edition.description_pt || edition.description_es
      : edition.description_es;

  return (
    <section className="section-padding border-y border-white/5">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">

          {/* Poster — natural aspect ratio, no cropping */}
          <div className="md:col-span-4">
            {posterSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={posterSrc}
                alt={`${edition.name} poster`}
                className="w-full h-auto block"
              />
            ) : (
              <div
                className="flex items-center justify-center bg-elevated"
                style={{ aspectRatio: '2/3' }}
              >
                <span
                  className="font-display leading-none"
                  style={{ fontSize: 'clamp(4rem,10vw,8rem)', color: 'transparent', WebkitTextStroke: '1px rgba(0,212,255,0.18)' }}
                >
                  {edition.year}
                </span>
              </div>
            )}
          </div>

          {/* Editorial info block */}
          <div className="md:col-span-8 pt-2">
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-plasma mb-6 font-medium">
              {t("label")}
            </p>

            <h2
              className="font-display text-text-primary mb-8 leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              {edition.name}
            </h2>

            <span className="rule-red" />

            <dl className="grid grid-cols-2 gap-y-5 gap-x-8 mb-10 max-w-sm">
              <div>
                <dt className="font-sans text-[9px] tracking-widest uppercase text-text-muted font-medium mb-1">
                  {t("year_label")}
                </dt>
                <dd className="font-display text-2xl text-text-primary">{edition.year}</dd>
              </div>
              <div>
                <dt className="font-sans text-[9px] tracking-widest uppercase text-text-muted font-medium mb-1">
                  {t("dates_label")}
                </dt>
                <dd className="font-sans text-sm text-text-secondary font-light">{dateLabel}</dd>
              </div>
            </dl>

            {description && (
              <div className="mb-10 max-w-lg space-y-4">
                {description.split("\n\n").map((para, i) => (
                  <p key={i} className="font-sans text-base text-text-secondary leading-relaxed font-light">
                    {para}
                  </p>
                ))}
              </div>
            )}

            <Link href={`/${locale}/${locale === 'es' ? 'edicion' : 'edition'}`} className="btn-primary">
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

