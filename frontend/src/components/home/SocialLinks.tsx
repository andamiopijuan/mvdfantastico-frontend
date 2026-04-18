"use client";

import { useTranslations } from "next-intl";

const SOCIAL = [
  {
    platform: "Instagram",
    handle: "@mvdfantastico",
    href: "https://www.instagram.com/mvdfantastico/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="w-6 h-6 shrink-0"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    platform: "X",
    handle: "@montevideofan",
    href: "https://x.com/montevideofan",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-6 h-6 shrink-0"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: "Facebook",
    handle: "/FestivalMontevideoFantastico",
    href: "https://www.facebook.com/FestivalMontevideoFantastico/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-6 h-6 shrink-0"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function SocialLinks() {
  const t = useTranslations("home.social");

  return (
    <section
      className="section-padding"
      style={{
        borderTop: "2px solid rgba(0,212,255,0.35)",
        background: "linear-gradient(180deg, rgba(0,212,255,0.04) 0%, transparent 60%)",
      }}
    >
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-10">
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-plasma mb-3 font-medium">
            {t("eyebrow")}
          </p>
          <h2
            className="font-display text-text-primary leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {t("heading")}
          </h2>
        </div>

        {/* Social rows */}
        <div className="flex flex-col divide-y divide-white/10">
          {SOCIAL.map(({ platform, handle, href, icon }) => (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 py-6 text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {/* Left: icon + name + handle */}
              <div className="flex items-center gap-5">
                <span className="text-text-muted group-hover:text-plasma transition-colors duration-200 scale-110 origin-left">
                  {icon}
                </span>
                <span
                  className="font-display leading-none text-text-primary"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                >
                  {platform}
                </span>
                <span className="font-sans text-[11px] tracking-widest uppercase text-text-muted hidden sm:block">
                  {handle}
                </span>
              </div>

              {/* Right: external arrow */}
              <span className="font-sans text-[11px] tracking-widest uppercase text-text-muted group-hover:text-plasma transition-colors duration-200 flex items-center gap-1.5">
                <span className="hidden sm:inline">{handle}</span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4 shrink-0 sm:hidden"
                  aria-hidden="true"
                >
                  <path d="M3 13L13 3M7 3h6v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4 shrink-0 hidden sm:block"
                  aria-hidden="true"
                >
                  <path d="M3 13L13 3M7 3h6v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
