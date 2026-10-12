// PT alias: /[locale]/juri → same page as /[locale]/jurado
import type { Metadata } from "next";
import { generateMetadata as juryMetadata } from "../jurado/page";

export { default } from "../jurado/page";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const metadata = await juryMetadata({ params });
  if (params.locale !== "pt") metadata.robots = { index: false, follow: true };
  else delete metadata.robots;
  return metadata;
}
