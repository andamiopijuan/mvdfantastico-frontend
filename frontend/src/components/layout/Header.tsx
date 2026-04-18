"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/${locale === "es" ? "edicion" : "edition"}`, label: t("edition") },
    { href: `/${locale}/archivo`, label: t("archive") },
    { href: `/${locale}/acerca`, label: t("about") },
    { href: `/${locale}/contacto`, label: t("contact") },
  ];

  return (
    <>
      {/* Plasma→nova gradient accent strip */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50" style={{ background: 'linear-gradient(90deg, #00d4ff 0%, #a259f7 50%, #00d4ff 100%)' }} />

      <header className="fixed top-0.5 left-0 right-0 z-40 bg-void border-b border-white/10">
        <div className="container-wide flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center flex-shrink-0"
            aria-label="Montevideo Fantástico — Inicio"
          >
            <Image
              src="/logos/logo-main.png.png"
              alt="Montevideo Fantástico"
              width={220}
              height={80}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
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

          {/* Right — language + mobile toggle */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="font-sans text-xs tracking-widest uppercase">
                {menuOpen ? "✕" : "Menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-void pt-16 flex flex-col md:hidden">
          <nav className="container-wide flex flex-col gap-0 mt-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-5xl text-text-primary hover:text-plasma transition-colors py-3 border-b border-white/5 leading-none"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="container-wide mt-auto pb-12">
            <p className="font-sans text-xs tracking-[0.25em] text-text-muted uppercase">
              Festival Internacional de Cine Fantástico · Montevideo, Uruguay
            </p>
          </div>
        </div>
      )}

      {/* Header spacer */}
      <div className="h-16" />
    </>
  );
}

