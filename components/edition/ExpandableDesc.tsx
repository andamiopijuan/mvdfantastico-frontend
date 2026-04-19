"use client";
import { useState } from "react";

const LIMIT = 140;

export default function ExpandableDesc({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = text.length > LIMIT;

  return (
    <p className="text-xs text-text-secondary leading-relaxed mt-2 font-light">
      {expanded || !needsTruncation ? text : text.slice(0, LIMIT).trimEnd()}
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-1 text-plasma hover:opacity-70 transition-opacity font-medium"
        >
          {expanded ? " Leer menos" : "… Leer más"}
        </button>
      )}
    </p>
  );
}
