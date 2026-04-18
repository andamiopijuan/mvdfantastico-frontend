"use client";

export default function VideoSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div
          className="relative overflow-hidden"
          style={{
            border: "1px solid rgba(0,212,255,0.15)",
            background: "linear-gradient(135deg, rgba(0,212,255,0.03) 0%, rgba(162,89,247,0.05) 100%)",
          }}
        >
          {/* Decorative accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)" }}
          />

          <div className="flex flex-col md:flex-row items-center gap-10 px-10 py-14 md:px-16">

            {/* Play icon */}
            <div
              className="flex-shrink-0 w-20 h-20 flex items-center justify-center"
              style={{
                border: "1px solid rgba(0,212,255,0.25)",
                background: "rgba(0,212,255,0.06)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="w-8 h-8 text-plasma"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" className="text-plasma" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-plasma mb-3 font-medium">
                Archivo de video
              </p>
              <h3
                className="font-display text-white leading-tight mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                Ceremonia de premios — MVF XV
              </h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed mb-0 max-w-md font-light">
                La entrega de premios de la edición XV está disponible en nuestro canal.
              </p>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <a
                href="https://youtu.be/oC7NflnelgY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest px-8 py-4 text-void font-bold transition-opacity hover:opacity-85"
                style={{ background: "linear-gradient(135deg, #00d4ff, #a259f7)" }}
              >
                <svg viewBox="0 0 20 14" fill="currentColor" className="w-5 h-3.5 flex-shrink-0" aria-hidden="true">
                  <path d="M19.582 2.186A2.506 2.506 0 0 0 17.836.44C16.272 0 10 0 10 0S3.729 0 2.164.44A2.506 2.506 0 0 0 .418 2.186C0 3.75 0 7 0 7s0 3.25.418 4.814a2.506 2.506 0 0 0 1.746 1.746C3.729 14 10 14 10 14s6.271 0 7.836-.44a2.506 2.506 0 0 0 1.746-1.746C20 10.25 20 7 20 7s0-3.25-.418-4.814zM8 10V4l5.196 3L8 10z" />
                </svg>
                Ver en YouTube
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
