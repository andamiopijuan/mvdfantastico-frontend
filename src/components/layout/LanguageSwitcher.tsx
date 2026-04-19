"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
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

  const switchLocale = (next: Locale) => {
    // Replace current locale segment in the path
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center gap-1" aria-label={t("language")}>
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={clsx(
            "text-xs px-2 py-1 rounded-sm transition-colors",
            l === locale
              ? "text-void font-bold"
              : "text-text-secondary hover:text-text-primary"
          )}
          style={l === locale ? { background: "linear-gradient(135deg, #00d4ff, #a259f7)" } : undefined}
          aria-current={l === locale ? "true" : undefined}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
