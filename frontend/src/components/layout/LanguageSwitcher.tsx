"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { useState, useRef, useEffect, useId, type KeyboardEvent } from "react";
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const initialFocusIndex = useRef(0);
  const menuId = useId();

  useEffect(() => {
    if (open) optionRefs.current[initialFocusIndex.current]?.focus();
  }, [open]);

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
    triggerRef.current?.focus();
    if (next === locale) { setOpen(false); return; }
    setOpen(false);
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  const openMenu = (index: number) => {
    initialFocusIndex.current = index;
    setOpen(true);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(event.key === "ArrowDown" ? 0 : locales.length - 1);
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = optionRefs.current.findIndex((option) => option === document.activeElement);
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation();
      const scope = triggerRef.current?.closest('[role="dialog"][aria-modal="true"]') ?? document.body;
      const focusable = Array.from(scope.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter((element) => element.getClientRects().length > 0 && !element.closest("[inert]") && !ref.current?.querySelector('[role="menu"]')?.contains(element));
      const triggerIndex = focusable.indexOf(triggerRef.current!);
      const next = focusable[triggerIndex + (event.shiftKey ? -1 : 1)] ?? focusable[event.shiftKey ? focusable.length - 1 : 0];
      setOpen(false);
      next?.focus();
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      const next = event.key === "Home" ? 0
        : event.key === "End" ? locales.length - 1
        : (index + (event.key === "ArrowDown" ? 1 : -1) + locales.length) % locales.length;
      optionRefs.current[next]?.focus();
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger — current locale + chevron */}
      <button
        ref={triggerRef}
        onClick={() => open ? setOpen(false) : openMenu(locales.indexOf(locale))}
        onKeyDown={handleTriggerKeyDown}
        className="flex items-center gap-1.5 h-8 px-2 font-sans text-[11px] font-semibold tracking-widest uppercase text-text-primary hover:text-plasma transition-colors"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={`${t("language")}: ${LOCALE_LABELS[locale]}`}
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
          id={menuId}
          className="absolute right-0 top-[calc(100%+4px)] bg-[#0c1220] border border-white/15 shadow-lg z-[70] min-w-[60px]"
          role="menu"
          aria-label={t("language")}
          onKeyDown={handleMenuKeyDown}
        >
          {locales.map((l, index) => (
            <button
              key={l}
              ref={(element) => { optionRefs.current[index] = element; }}
              onClick={() => switchLocale(l)}
              role="menuitemradio"
              aria-checked={l === locale}
              tabIndex={-1}
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
