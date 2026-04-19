import Link from "next/link";
import { useLocale } from "next-intl";
import type { EditionSummary } from "@/lib/types";
import { clsx } from "clsx";

function toRoman(n: number): string {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let result = "";
  for (let i = 0; i < vals.length; i++) {
    while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
  }
  return result;
}

interface EditionCardProps {
  edition: EditionSummary;
  compact?: boolean;
}

export default function EditionCard({ edition, compact = false }: EditionCardProps) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/archivo/${edition.year}`}
      className={clsx(
        "group relative block overflow-hidden bg-void",
        compact ? "aspect-[2/3]" : "aspect-[2/3]"
      )}
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Poster image — cover fills card; works best for portrait posters */}
      {edition.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={edition.poster}
          alt={`${edition.name} poster`}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-elevated flex items-center justify-center">
          <span
            className="font-display text-white/10 leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            MVF {toRoman(edition.number)}
          </span>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Hover tint + border */}
      <div className="absolute inset-0 bg-plasma/0 group-hover:bg-plasma/8 transition-colors duration-300" />
      <div className="absolute inset-0 border border-transparent group-hover:border-plasma/50 transition-colors duration-300" />

      {/* Edition identity overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p
          className="font-display text-white leading-none"
          style={{ fontSize: compact ? "1.4rem" : "1.8rem" }}
        >
          MVF {toRoman(edition.number)}
        </p>
        <p className="font-sans text-[10px] tracking-widest text-plasma uppercase mt-1 font-medium">
          {edition.year}
        </p>
      </div>
    </Link>
  );
}

