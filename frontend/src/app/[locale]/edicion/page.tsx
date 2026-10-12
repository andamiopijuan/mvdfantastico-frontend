// Spanish-language route alias: /es/edicion → same content as /[locale]/edition
import type { Metadata } from "next";
import { generateMetadata as editionMetadata } from "../edition/page";

export { default } from "../edition/page";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const metadata = await editionMetadata({ params });
  if (params.locale !== "es") metadata.robots = { index: false, follow: true };
  else delete metadata.robots;
  return metadata;
}
