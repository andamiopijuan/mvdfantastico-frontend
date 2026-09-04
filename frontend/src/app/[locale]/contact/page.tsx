import { redirect } from "next/navigation";

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
