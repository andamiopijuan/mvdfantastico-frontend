// Mail icon
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6 shrink-0">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

import { getTranslations, setRequestLocale } from "next-intl/server";

// Instagram icon
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6 shrink-0">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 shrink-0">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 shrink-0">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M3 13L13 3M7 3h6v6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  return (
    <div>
      {/* Hero header strip */}
      <div
        className="pt-12 pb-10 md:pt-20 md:pb-12"
        style={{
          borderTop: "2px solid rgba(0,212,255,0.35)",
          background: "linear-gradient(180deg, rgba(0,212,255,0.06) 0%, transparent 80%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container-wide">
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-plasma mb-2 font-medium">
            {t("eyebrow")}
          </p>
          <h1
            className="font-display text-text-primary leading-none mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            {t("title")}
          </h1>
          <p className="font-sans text-base text-text-secondary leading-relaxed font-light max-w-xl">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Email — featured block */}
      <div
        className="py-10 md:py-12"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container-wide">
          <a
            href="mailto:montevideofan@gmail.com"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 transition-colors duration-200"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(162,89,247,0.08) 100%)",
              border: "1px solid rgba(0,212,255,0.22)",
              borderLeft: "4px solid #00d4ff",
            }}
          >
            <div className="flex items-center gap-5">
              <span
                className="text-plasma shrink-0 p-3"
                style={{ border: "1px solid rgba(0,212,255,0.3)", background: "rgba(0,212,255,0.06)" }}
              >
                <MailIcon />
              </span>
              <div>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-text-muted mb-1 font-medium">
                  {t("email_direct")}
                </p>
                <p
                  className="font-display text-white leading-none group-hover:text-plasma transition-colors duration-200"
                  style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
                >
                  montevideofan@gmail.com
                </p>
              </div>
            </div>
            <span className="text-text-muted group-hover:text-plasma transition-colors duration-200 shrink-0">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>

      {/* Social rows */}
      <div className="pt-10 pb-16 md:pt-12 md:pb-24">
        <div className="container-wide">
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-text-muted mb-1 font-medium">
            {t("social_label")}
          </p>
          <h2
            className="font-display text-text-primary leading-none mb-6"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
          >
            {t("social_heading")}
          </h2>
          <div className="flex flex-col divide-y divide-white/10 max-w-2xl">
            {([
              { icon: <InstagramIcon />, label: "Instagram", handle: "@mvdfantastico", href: "https://www.instagram.com/mvdfantastico/" },
              { icon: <XIcon />, label: "X", handle: "@montevideofan", href: "https://x.com/montevideofan" },
              { icon: <FacebookIcon />, label: "Facebook", handle: "/FestivalMontevideoFantastico", href: "https://www.facebook.com/FestivalMontevideoFantastico/" },
            ] as const).map(({ icon, label, handle, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 py-4 transition-colors duration-200"
              >
                <span className="text-text-muted group-hover:text-plasma transition-colors duration-200 shrink-0">
                  {icon}
                </span>
                <span
                  className="font-display leading-none text-white w-40 shrink-0 group-hover:text-plasma transition-colors duration-200"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
                >
                  {label}
                </span>
                <span className="font-sans text-[11px] tracking-widest uppercase text-text-muted flex-1 truncate">
                  {handle}
                </span>
                <span className="text-text-muted group-hover:text-plasma transition-colors duration-200 shrink-0">
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
