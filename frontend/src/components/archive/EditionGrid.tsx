import type { EditionSummary } from "@/lib/types";
import EditionCard from "./EditionCard";

interface EditionGridProps {
  editions: EditionSummary[];
}

export default function EditionGrid({ editions }: EditionGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {editions.map((edition) => (
        <EditionCard key={edition.id} edition={edition} />
      ))}
    </div>
  );
}
