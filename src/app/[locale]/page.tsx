import { getCurrentEdition, getEditions } from "@/lib/api";
import Hero from "@/components/home/Hero";
import CurrentEditionHighlight from "@/components/home/CurrentEditionHighlight";
import ArchivePreview from "@/components/home/ArchivePreview";
import VideoSection from "@/components/home/VideoSection";
import SocialLinks from "@/components/home/SocialLinks";

export default async function HomePage() {
  const [currentEdition, allEditions] = await Promise.allSettled([
    getCurrentEdition(),
    getEditions(),
  ]);

  const edition = currentEdition.status === "fulfilled" ? currentEdition.value : null;
  const editions =
    allEditions.status === "fulfilled" ? allEditions.value.results : [];

  return (
    <>
      <Hero edition={edition} />
      {edition && <CurrentEditionHighlight edition={edition} />}
      <SocialLinks />
      <ArchivePreview editions={editions} />
      <VideoSection />
    </>
  );
}
