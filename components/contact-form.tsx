"use client";
import React, { useState } from "react";
import enText from "@/app/messages/en.json";
import frText from "@/app/messages/fr.json";
import { submitContact } from "@/lib/contact-submit.mjs";

export const ContactForm = ({ locale }: { locale: string }) => {
  const t = locale === "fr" ? frText.contact : enText.contact;
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  return (
    <section className="max-w-[1160px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-[72px]">
      {/* Left — Info */}
      <div>
        <div className="font-mono text-xs tracking-[0.08em] text-accent-indigo mb-4">
          {t.eyebrow}
        </div>
        <h1 className="text-[32px] md:text-[42px] font-bold tracking-[-0.02em] leading-[1.15] mb-5">
          {t.heading}
        </h1>
        <p className="text-base text-text-secondary leading-[1.65] mb-10">
          {t.subheading}
        </p>

        <div
          className="flex flex-col gap-6 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <div className="text-xs text-text-tertiary mb-1.5">{t.emailLabel}</div>
            <a href={`mailto:${t.emailValue}`} className="text-[15px] hover:text-accent-indigo underline">{t.emailValue}</a>
          </div>
          <div>
            <div className="text-xs text-text-tertiary mb-1.5">{t.locationLabel}</div>
            <div className="text-[15px]">{t.locationValue}</div>
          </div>
          <div>
            <div className="text-xs text-text-tertiary mb-1.5">{t.responseLabel}</div>
            <div className="text-[15px]">{t.responseValue}</div>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div>
        {!submitted ? (
          <form
            action="https://formspree.io/f/mgveanvn"
            method="POST"
            onSubmit={async (e) => {
              e.preventDefault();
              if (pending) return;
              const data = new FormData(e.currentTarget);
              setPending(true);
              setError("");
              const sent = await submitContact(data);
              setPending(false);
              if (sent) setSubmitted(true);
              else setError(locale === "fr" ? "L’envoi a échoué. Votre message est conservé : réessayez ou utilisez le lien e-mail." : "Your message could not be sent. Your details are preserved: try again or use the email link.");
            }}
            className="rounded-2xl p-8 md:p-10 flex flex-col gap-5"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#111113",
            }}
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] text-text-secondary mb-2">
                  {t.formName}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t.formNamePlaceholder}
                  className="w-full rounded-[9px] px-[14px] py-3 text-[14.5px] text-text-primary transition-[border-color] duration-150"
                  style={{
                    background: "#0a0a0b",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              </div>
              <div>
                <label className="block text-[13px] text-text-secondary mb-2">
                  {t.formEmail}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t.formEmailPlaceholder}
                  className="w-full rounded-[9px] px-[14px] py-3 text-[14.5px] text-text-primary transition-[border-color] duration-150"
                  style={{
                    background: "#0a0a0b",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-[13px] text-text-secondary mb-2">
                {t.formCompany}
              </label>
              <input
                type="text"
                name="company"
                placeholder={t.formCompanyPlaceholder}
                className="w-full rounded-[9px] px-[14px] py-3 text-[14.5px] text-text-primary transition-[border-color] duration-150"
                style={{
                  background: "#0a0a0b",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
            </div>

            {/* Engagement type */}
            <div>
              <label className="block text-[13px] text-text-secondary mb-2">
                {t.formType}
              </label>
              <select
                name="type"
                className="w-full rounded-[9px] px-[14px] py-3 text-[14.5px] text-text-primary"
                style={{
                  background: "#0a0a0b",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {t.formTypeOptions.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Project details */}
            <div>
              <label className="block text-[13px] text-text-secondary mb-2">
                {t.formMessage}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder={t.formMessagePlaceholder}
                className="w-full rounded-[9px] px-[14px] py-3 text-[14.5px] text-text-primary resize-y font-[inherit] transition-[border-color] duration-150"
                style={{
                  background: "#0a0a0b",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
            </div>

            {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
            <button
              type="submit"
              disabled={pending}
              aria-busy={pending}
              className="btn-primary text-[15px] font-semibold px-6 py-[14px] rounded-[9px] border-none cursor-pointer mt-1"
              style={{ background: "#f2f2f1", color: "#0a0a0b" }}
            >
              {pending ? (locale === "fr" ? "Envoi…" : "Sending…") : t.formSubmit}
            </button>

            <p className="text-[12.5px] text-text-tertiary text-center m-0">
              {t.formDisclaimer}
            </p>
          </form>
        ) : (
          <div
            className="rounded-2xl px-10 py-14 text-center"
            style={{
              border: "1px solid rgba(110,231,167,0.25)",
              background: "#111113",
            }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-5 text-[20px] text-accent-green"
              style={{ background: "rgba(110,231,167,0.15)" }}
            >
              ✓
            </div>
            <div className="text-[20px] font-semibold mb-[10px]">{t.successTitle}</div>
            <p className="text-[14.5px] text-text-secondary m-0">{t.successBody}</p>
          </div>
        )}
      </div>
    </section>
  );
};
