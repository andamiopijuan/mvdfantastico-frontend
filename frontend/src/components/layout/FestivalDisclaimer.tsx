const DISCLAIMER_TEXTS: Record<string, string> = {
  es: "Debido a la gran cantidad de materiales de calidad recibidos y a los pedidos del público, el festival se extiende hasta el 28 de junio, fecha en la que se realizará la ceremonia de entrega de premios. Continuaremos sumando nuevas sedes y funciones, que serán anunciadas oportunamente.",
  en: "Due to the high volume of quality submissions and audience demand, the festival has been extended until June 28, when the awards ceremony will take place. Additional venues and screenings will be announced soon.",
  pt: "Devido à grande quantidade de materiais de qualidade recebidos e à demanda do público, o festival foi estendido até 28 de junho, data em que ocorrerá a cerimônia de premiação. Novos locais e sessões serão anunciados em breve.",
};

const LABEL: Record<string, string> = {
  es: "Actualización",
  en: "Update",
  pt: "Atualização",
};

export default function FestivalDisclaimer({ locale }: { locale: string }) {
  const text = DISCLAIMER_TEXTS[locale] ?? DISCLAIMER_TEXTS.es;
  const label = LABEL[locale] ?? LABEL.es;
  return (
    <p
      className="font-sans text-base leading-relaxed mt-4"
      style={{
        borderLeft: "2px solid rgba(162,89,247,0.55)",
        paddingLeft: "1.25rem",
        color: "rgba(255,255,255,0.78)",
      }}
    >
      <span
        className="font-sans text-[10px] tracking-[0.25em] uppercase mr-2 align-middle"
        style={{ color: "rgba(162,89,247,0.9)" }}
      >
        {label}
      </span>
      {text}
    </p>
  );
}
