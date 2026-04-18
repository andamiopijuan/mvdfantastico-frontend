import { redirect } from "next/navigation";

interface PageProps {
  params: { locale: string };
}

export default function ContactRedirectPage({ params }: PageProps) {
  redirect(`/${params.locale}/contacto`);
}