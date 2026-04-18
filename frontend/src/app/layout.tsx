import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Montevideo Fantástico",
    template: "%s | Montevideo Fantástico",
  },
  description:
    "International film festival dedicated to horror, fantasy, and science fiction independent cinema.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
