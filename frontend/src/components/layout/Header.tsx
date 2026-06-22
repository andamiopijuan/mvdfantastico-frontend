"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect } from "react";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href;

  const jurySlug = locale === "es" ? "jurado" : locale === "pt" ? "juri" : "jury";

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/${locale === "es" ? "edicion" : "edition"}`, label: t("edition") },
    { href: `/${locale}/${jurySlug}`, label: t("jury") },
    { href: `/${locale}/${locale === "es" ? "archivo" : "archive"}`, label: t("archive") },
    { href: `/${locale}/${locale === "es" ? "acerca" : "about"}`, label: t("about") },
    { href: `/${locale}/${locale === "es" ? "contacto" : "contact"}`, label: t("contact") },
  ];

  return (
    <>
      {/* Plasma→nova gradient accent strip */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50" style={{ background: 'linear-gradient(90deg, #00d4ff 0%, #a259f7 50%, #00d4ff 100%)' }} />

      {/* Main header */}
      <header className="fixed top-0.5 left-0 right-0 z-40 bg-void border-b border-white/10">
        <div className="container-wide flex items-center justify-between h-14 md:h-16 gap-2">

          {/* Logo — smaller on mobile to leave room for right controls */}
          <Link
            href={`/${locale}`}
            className="flex items-center flex-shrink-0 min-w-0"
            aria-label="Montevideo Fantástico — Inicio"
          >
            <Image
              src="/logos/logo-main.png.png"
              alt="Montevideo Fantástico"
              width={220}
              height={80}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-5 flex-1 justify-center" aria-label="Main navigation">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx("nav-link", isActive(href) && "nav-link-active")}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: language dropdown + mobile menu button */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <LanguageSwitcher />
            {/* MENU button — mobile only */}
            <button
              className="md:hidden flex items-center justify-center h-8 px-2 text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {/* Hamburger icon */}
              <svg viewBox="0 0 20 14" className="w-5 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <line x1="0" y1="1" x2="20" y2="1" />
                <line x1="0" y1="7" x2="20" y2="7" />
                <line x1="0" y1="13" x2="20" y2="13" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile navigation overlay ─────────────────────────────────
          z-[60]: above header (z-40) and gradient strip (z-50).
          Fully covers the viewport; desktop nav is never visible underneath.
      ──────────────────────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-[60] bg-void flex flex-col animate-fade-in"
          style={{ animationDuration: '0.18s', animationTimingFunction: 'ease-out' }}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          {/* Top gradient strip */}
          <div
            className="h-0.5 flex-shrink-0"
            style={{ background: 'linear-gradient(90deg, #00d4ff 0%, #a259f7 50%, #00d4ff 100%)' }}
          />

          {/* Overlay header row */}
          <div className="px-4 sm:px-6 flex items-center justify-between h-14 flex-shrink-0 border-b border-white/10">
            <Link
              href={`/${locale}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center flex-shrink-0"
              aria-label="Montevideo Fantástico — Inicio"
            >
              <Image
                src="/logos/logo-main.png.png"
                alt="Montevideo Fantástico"
                width={220}
                height={80}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-8 h-8 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Cerrar menú"
              >
                <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </button>
            </div>
          </div>

          {/* Nav links — balanced size, not oversized */}
          <nav className="px-4 sm:px-6 flex flex-col mt-6 flex-1 overflow-y-auto" aria-label="Navegación principal">
            {links.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-3 py-4 border-b border-white/8 last:border-0"
              >
                <span className="font-sans text-[10px] tracking-widest text-text-muted w-5 text-right flex-shrink-0">
                  0{i + 1}
                </span>
                <span
                  className={clsx(
                    "font-display leading-none transition-colors",
                    isActive(href) ? "text-plasma" : "text-text-primary group-hover:text-plasma"
                  )}
                  style={{ fontSize: "clamp(1.75rem, 8vw, 2.5rem)" }}
                >
                  {label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Footer tagline */}
          <div className="px-4 sm:px-6 pb-8 mt-4 flex-shrink-0">
            <p className="font-sans text-[9px] tracking-[0.25em] text-text-muted uppercase">
              Festival Internacional de Cine Fantástico · Montevideo, Uruguay
            </p>
          </div>
        </div>
      )}

      {/* Header spacer */}
      <div className="h-[58px] md:h-[66px]" />
    </>
  );
}

