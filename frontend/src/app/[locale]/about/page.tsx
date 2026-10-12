import { compatibilityMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }) {
  return compatibilityMetadata(params.locale, "/acerca/");
}

export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "en" },
    { locale: "pt" },
  ];
}
import { redirect } from "next/navigation";

interface PageProps {
  params: { locale: string };
}

export default async function AboutPage({ params }: PageProps) {
  redirect(`/${params.locale}/acerca`);
}
