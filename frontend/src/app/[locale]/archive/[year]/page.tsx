import { getEditions } from "@/lib/api";
import { redirect } from "next/navigation";

const STATIC_LOCALES = ["es", "en", "pt"] as const;

export async function generateStaticParams() {
  try {
    const res = await getEditions();
    const years = res.results
      .filter((e) => e.has_legacy || e.is_current)
      .map((e) => String(e.year))
      .filter((year) => Boolean(year));

    return STATIC_LOCALES.flatMap((locale) =>
      years.map((year) => ({ locale, year }))
    );
  } catch {
    const fallbackYears = [2017, 2022, 2023, 2024, 2026].map((year) => String(year));
    return STATIC_LOCALES.flatMap((locale) =>
      fallbackYears.map((year) => ({ locale, year }))
    );
  }
}

interface PageProps {
  params: { locale: string; year: string };
}

export default function ArchiveYearRedirectPage({ params }: PageProps) {
  redirect(`/${params.locale}/archivo/${params.year}`);
}
