import { redirect } from "next/navigation";
import { compatibilityMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }) {
  return compatibilityMetadata(params.locale, "/contacto/");
}

export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "en" },
    { locale: "pt" },
  ];
}

export default function ContactRedirect({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/contacto`);
}
