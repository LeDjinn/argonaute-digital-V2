import Link from "next/link";
import React from "react";
import { Logo } from "@/components/logo";
import enText from "@/app/messages/en.json";
import frText from "@/app/messages/fr.json";

export const Footer = ({ locale = "en" }: { locale?: string }) => {
  const t = locale === "fr" ? frText : enText;
  const nav = t.nav;
  const footer = t.footer;

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-[1160px] mx-auto px-12 pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="mb-[14px]">
            <Logo />
          </div>
          <p className="text-[13.5px] text-text-tertiary leading-relaxed max-w-[280px]">
            {footer.description}
          </p>
        </div>

        {/* Navigate */}
        <div>
          <div className="text-[12.5px] text-text-tertiary mb-[14px]">
            {footer.navigateLabel}
          </div>
          <div className="flex flex-col gap-[10px]">
            <Link href="/#offers" className="navlink-hover text-sm text-text-secondary">
              {nav.services}
            </Link>
            <Link href="/case-studies" className="navlink-hover text-sm text-text-secondary">
              {nav.caseStudies}
            </Link>
            <Link href="/contact" className="navlink-hover text-sm text-text-secondary">
              {nav.contact}
            </Link>
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="text-[12.5px] text-text-tertiary mb-[14px]">
            {footer.servicesLabel}
          </div>
          <div className="flex flex-col gap-[10px]">
            {footer.services.map((s: string) => (
              <span key={s} className="text-sm text-text-secondary">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="text-[12.5px] text-text-tertiary mb-[14px]">
            {footer.contactLabel}
          </div>
          <div className="flex flex-col gap-[10px]">
            <span className="text-sm text-text-secondary">{footer.email}</span>
            <span className="text-sm text-text-secondary">{footer.location}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-[1160px] mx-auto px-12 py-6 flex flex-col sm:flex-row justify-between text-[12.5px] text-text-tertiary gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span>{footer.copyright}</span>
        <span>{footer.availability}</span>
      </div>
    </footer>
  );
};
