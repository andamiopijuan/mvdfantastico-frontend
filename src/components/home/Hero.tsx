import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import type { Edition } from "@/lib/types";

interface HeroProps {
  edition: Edition | null;
}

export default function Hero({ edition }: HeroProps) {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  const dateLabel = edition
    ? `${new Date(edition.start_date + "T12:00:00").toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
      })} — ${new Date(edition.end_date + "T12:00:00").toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`
    : null;

  const visualSrc = edition?.poster || edition?.key_visual;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-void">

      {/* ── Ambient nebula atmosphere — always present ─────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Primary plasma orb — upper right */}
        <div
          className="absolute -top-48 -right-48 w-[80vw] max-w-[1000px] aspect-square rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 60%)" }}
        />
        {/* Secondary nova orb — lower right */}
        <div
          className="absolute bottom-0 right-[10%] w-[55vw] max-w-[750px] aspect-square rounded-full"
          style={{ background: "radial-gradient(circle, rgba(162,89,247,0.07) 0%, transparent 60%)" }}
        />

        {/* Directional fade — left side stays dark for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/90 to-void/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
      </div>

      {/* ── Visual artwork — right half ─────────────────────────────── */}
      {visualSrc ? (
        /* Real poster / key visual */
        <div className="absolute right-0 top-0 bottom-0 w-[52%] z-0 pointer-events-none">
          <Image
            src={visualSrc}
            alt={edition?.name ?? ""}
            fill
            priority
            className="object-cover object-top"
            style={{ opacity: 0.62 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/40 to-transparent" />
        </div>
      ) : (
        /* Logo — primary visual element when no poster exists */
        <div
          className="absolute right-[4%] top-1/2 -translate-y-1/2 w-[44vw] max-w-[600px] z-[2] pointer-events-none select-none flex items-center justify-center"
        >
          <Image
            src="/logos/logo-main.png.png"
            alt="Montevideo Fantástico"
            width={600}
            height={340}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      )}

      {/* ── Text content ───────────────────────────────────────────── */}
      <div className="container-wide relative z-10 pt-40 pb-20">
        <div style={{ maxWidth: "min(52%, 680px)", minWidth: "320px" }}>
          {/* Eyebrow */}
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-plasma mb-8 font-medium">
            {t("eyebrow")}
          </p>

          {/* Main title */}
          <h1
            className="font-display text-text-primary leading-none mb-2"
            style={{ fontSize: "clamp(3.5rem, 9vw, 10rem)" }}
          >
            MONTEVIDEO
          </h1>
          <h1
            className="font-display leading-none mb-10"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 10rem)",
              WebkitTextStroke: "1px rgba(232,237,245,0.7)",
              color: "transparent",
            }}
          >
            FANTÁSTICO
          </h1>

          {/* Plasma rule + edition meta */}
          <div className="flex items-center gap-6 mb-12">
            <span className="block h-px w-10 bg-plasma flex-shrink-0" />
            {edition ? (
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-text-secondary font-normal">
                {edition.name}&nbsp;&nbsp;·&nbsp;&nbsp;{dateLabel}
              </p>
            ) : (
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-text-muted font-normal">
                {t("tagline")}
              </p>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href={`/${locale}/${locale === 'es' ? 'edicion' : 'edition'}`} className="btn-primary">
              {t("cta_current")}
            </Link>
            <Link href={`/${locale}/archivo`} className="btn-ghost">
              {t("cta_archive")}
            </Link>
          </div>

          {/* Festival description */}
          <div
            className="border-l-2 pl-5 space-y-3 mb-10"
            style={{ borderColor: "rgba(0,212,255,0.25)" }}
          >
            {t("description").split("\n\n").map((para, i) => (
              <p
                key={i}
                className="font-sans text-base text-text-secondary leading-relaxed font-light"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-text-muted">
              Seguinos
            </span>
            <div className="flex gap-4">
              {[
                { label: "Instagram", href: "https://www.instagram.com/mvdfantastico/" },
                { label: "X", href: "https://x.com/montevideofan" },
                { label: "Facebook", href: "https://www.facebook.com/FestivalMontevideoFantastico/" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] tracking-widest uppercase text-text-muted hover:text-plasma transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent z-10 pointer-events-none" />
    </section>
  );
}

