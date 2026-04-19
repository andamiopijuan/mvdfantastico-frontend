"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="border-t border-white/10 bg-void mt-auto">
      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

          {/* Brand */}
          <div>
            <Link href={`/${locale}`} aria-label="Montevideo Fantástico">
              <Image
                src="/logos/logo-main.png.png"
                alt="Montevideo Fantástico"
                width={140}
                height={48}
                className="h-10 w-auto object-contain mb-3"
              />
            </Link>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-text-muted/60 font-light">
              Festival Internacional de Cine Fantástico · Uruguay
            </p>
          </div>

          {/* Navigation — horizontal */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              ["home", `/${locale}`],
              ["edition", `/${locale}/${locale === "es" ? "edicion" : "edition"}`],
              ["archive", `/${locale}/archivo`],
              ["about", `/${locale}/acerca`],
              ["contact", `/${locale}/contacto`],
            ].map(([key, href]) => (
              <Link
                key={key}
                href={href}
                className="font-sans text-[10px] tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors font-medium"
              >
                {t(key as Parameters<typeof t>[0])}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-5">
              <a
                href="https://www.instagram.com/mvdfantastico/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-sans text-[11px] tracking-widest uppercase text-text-muted hover:text-plasma transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
              <a
                href="https://x.com/montevideofan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-sans text-[11px] tracking-widest uppercase text-text-muted hover:text-plasma transition-colors"
                aria-label="X"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </a>
              <a
                href="https://www.facebook.com/FestivalMontevideoFantastico/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-sans text-[11px] tracking-widest uppercase text-text-muted hover:text-plasma transition-colors"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            </div>
            <p className="font-sans text-[10px] tracking-wider text-text-muted font-light">
              © {new Date().getFullYear()} Montevideo Fantástico
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
