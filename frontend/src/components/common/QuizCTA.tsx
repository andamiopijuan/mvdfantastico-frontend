const QUIZ_URL = "https://fantastico.puedefuncionar.com/";

const COPY: Record<string, { title: string; text: string; button: string }> = {
  es: {
    title: "¿Qué tipo de espectador fantástico sos?",
    text: "Respondé cinco preguntas y descubrí qué película del festival te está esperando.",
    button: "Hacer el cuestionario",
  },
  en: {
    title: "What kind of fantastic viewer are you?",
    text: "Answer five questions and discover which festival film is waiting for you.",
    button: "Take the quiz",
  },
  pt: {
    title: "Que tipo de espectador fantástico você é?",
    text: "Responda cinco perguntas e descubra qual filme do festival está esperando por você.",
    button: "Fazer o questionário",
  },
};

interface QuizCTAProps {
  locale: string;
}

export default function QuizCTA({ locale }: QuizCTAProps) {
  const copy = COPY[locale] ?? COPY.es;
  return (
    <div
      className="relative overflow-hidden flex flex-col gap-3 px-4 py-4 mt-4"
      style={{
        background: "rgba(0,212,255,0.04)",
        border: "1px solid rgba(0,212,255,0.18)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute left-0 top-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, #00d4ff, #a259f7)" }}
      />
      <div>
        <p
          className="font-sans text-[9px] tracking-[0.35em] uppercase font-medium mb-1"
          style={{ color: "#00d4ff" }}
        >
          Quiz
        </p>
        <h3 className="font-display text-sm text-white leading-snug mb-2">
          {copy.title}
        </h3>
        <p
          className="font-sans text-xs leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          {copy.text}
        </p>
      </div>
      <a
        href={QUIZ_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start text-void text-[10px] uppercase tracking-widest px-4 py-2 font-bold transition-opacity hover:opacity-90 whitespace-nowrap"
        style={{ background: "linear-gradient(135deg, #00d4ff, #a259f7)" }}
      >
        {copy.button}
      </a>
    </div>
  );
}
