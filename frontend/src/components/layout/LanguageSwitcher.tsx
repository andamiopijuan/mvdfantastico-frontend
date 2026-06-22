"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";

const LOCALE_LABELS: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const switchLocale = (next: Locale) => {
    if (next === locale) { setOpen(false); return; }
    setOpen(false);
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  return (
    <div ref={ref} className="relative" aria-label={t("language")}>
      {/* Trigger — current locale + chevron */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 h-8 px-2 font-sans text-[11px] font-semibold tracking-widest uppercase text-text-primary hover:text-plasma transition-colors"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {LOCALE_LABELS[locale]}
        <svg
          viewBox="0 0 10 6"
          className={clsx("w-2.5 h-2.5 flex-shrink-0 transition-transform duration-150", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown — all three locales, current highlighted */}
      {open && (
        <div
          className="absolute right-0 top-[calc(100%+4px)] bg-[#0c1220] border border-white/15 shadow-lg z-[70] min-w-[60px]"
          role="listbox"
          aria-label={t("language")}
        >
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              role="option"
              aria-selected={l === locale}
              className={clsx(
                "w-full text-left px-4 py-2.5 font-sans text-[11px] font-semibold tracking-widest uppercase transition-colors",
                l === locale
                  ? "text-plasma bg-white/5 cursor-default"
                  : "text-text-secondary hover:text-plasma hover:bg-white/5"
              )}
            >
              {LOCALE_LABELS[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
