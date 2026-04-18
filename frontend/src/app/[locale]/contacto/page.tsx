"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { submitContactMessage } from "@/lib/api";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "El nombre es requerido.";
    if (!form.email.trim()) newErrors.email = "El email es requerido.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "El email no es válido.";
    if (!form.message.trim()) newErrors.message = "El mensaje es requerido.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      await submitContactMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container-wide section-padding">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-widest text-plasma mb-3">Contacto</p>
        <h1 className="font-serif text-4xl font-bold text-text-primary mb-10">
          {t("title")}
        </h1>

        {status === "success" ? (
          <div className="card-dark p-8 text-center">
            <p className="text-plasma text-4xl mb-4">✓</p>
            <p className="text-text-primary text-lg">{t("success")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            {/* Name */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">
                {t("name")}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-text-primary
                           placeholder-text-muted focus:outline-none focus:border-plasma transition-colors"
                placeholder="Tu nombre"
                maxLength={200}
              />
              {errors.name && <p className="text-plasma text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">
                {t("email")}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-text-primary
                           placeholder-text-muted focus:outline-none focus:border-plasma transition-colors"
                placeholder="tu@email.com"
                maxLength={254}
              />
              {errors.email && <p className="text-plasma text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">
                {t("message")}
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={6}
                className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-text-primary
                           placeholder-text-muted focus:outline-none focus:border-plasma transition-colors resize-none"
                placeholder="Tu mensaje..."
              />
              {errors.message && <p className="text-plasma text-xs mt-1">{errors.message}</p>}
            </div>

            {status === "error" && (
              <p className="text-plasma text-sm">{t("error")}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary self-start disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Enviando..." : t("send")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
