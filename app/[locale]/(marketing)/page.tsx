import Link from "next/link";
import type { Metadata } from "next";
import {siteUrl} from "@/lib/site-config";
import type {BlogParams} from "@/lib/blog";
export async function generateMetadata({params}:{params:BlogParams}):Promise<Metadata> {
  const {locale}=await params;
  const t=locale === "fr" ? frText : enText;
  const url=new URL(`/${locale === "fr" ? "fr" : "en"}`,siteUrl).href;
  return {alternates:{canonical:url,languages:{en:new URL("/en",siteUrl).href,fr:new URL("/fr",siteUrl).href,"x-default":new URL("/en",siteUrl).href}},openGraph:{title:t.hero.headline,description:t.hero.subheadline,url,type:"website",images:["/banner.png"]}};
}
import enText from "@/app/messages/en.json";
import frText from "@/app/messages/fr.json";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const t = resolvedParams.locale === "fr" ? frText : enText;

  return (
    <div className="relative">
      {/* ── HERO ── */}
      <section className="max-w-[1160px] mx-auto px-6 md:px-12 pt-16 md:pt-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          <div>
            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse-dot" />
              <span className="font-mono text-xs tracking-[0.04em] text-text-secondary">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-[36px] md:text-[54px] leading-[1.08] tracking-[-0.02em] font-bold mb-6" style={{ textWrap: "pretty" as any }}>
              {t.hero.headline}
            </h1>

            <p className="text-[16px] md:text-[17.5px] leading-relaxed text-text-secondary max-w-[540px] mb-5">
              {t.hero.subheadline}
            </p>

            <p className="text-sm leading-relaxed text-text-muted max-w-[520px] mb-8">
              {t.hero.byline}{" "}
              <span className="text-text-bright">{t.hero.bylineName}</span>
              {t.hero.bylineDesc}
            </p>

            <div className="flex flex-wrap gap-3.5 items-center mb-10">
              <Link
                href="/contact"
                className="btn-primary text-[15px] font-semibold px-6 py-[14px] rounded-[9px]"
                style={{ background: "#f2f2f1", color: "#0a0a0b" }}
              >
                {t.hero.ctaPrimary}
              </Link>
              <Link
                href="/case-studies"
                className="btn-ghost text-[15px] font-medium px-[22px] py-[13px] rounded-[9px]"
                style={{ border: "1px solid rgba(255,255,255,0.14)" }}
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Code editor visual */}
          <div
            className="rounded-[14px] overflow-hidden shadow-hero-card hidden lg:block"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#111113",
            }}
          >
            <div
              className="flex items-center gap-[7px] px-4 py-[13px]"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="w-[10px] h-[10px] rounded-full" style={{ background: "#3a3a3d" }} />
              <span className="w-[10px] h-[10px] rounded-full" style={{ background: "#3a3a3d" }} />
              <span className="w-[10px] h-[10px] rounded-full" style={{ background: "#3a3a3d" }} />
              <span className="font-mono text-xs text-text-tertiary ml-2">system-status.ts</span>
            </div>
            <div className="px-5 py-[22px] font-mono text-[13px] leading-[1.9]">
              <div className="text-code-comment">{t.hero.codeComment1}</div>
              <div>
                <span className="text-code-keyword">const</span>{" "}
                <span className="text-code-variable">stack</span> = {"{"}
              </div>
              <div className="pl-4 text-code-string">runtime: <span className="text-code-string">&quot;Node.js&quot;</span>,</div>
              <div className="pl-4 text-code-string">framework: <span className="text-code-string">&quot;Next.js&quot;</span>,</div>
              <div className="pl-4 text-code-string">db: <span className="text-code-string">&quot;PostgreSQL&quot;</span>,</div>
              <div className="pl-4 text-code-string">infra: <span className="text-code-string">&quot;GCP / Vercel&quot;</span>,</div>
              <div className="pl-4 text-code-string">ai: <span className="text-code-string">&quot;integrated&quot;</span></div>
              <div>{"}"}</div>
              <div className="mt-[14px] text-code-comment">{t.hero.codeComment2}</div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="w-[7px] h-[7px] rounded-full bg-accent-green" />
                <span className="text-code-variable">{t.hero.codeStatus}</span>{" "}
                <span className="text-code-comment">{t.hero.codeStatusLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audience pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 mb-16 md:mb-[100px]">
          {t.audiences.map((a: any, i: number) => (
            <div
              key={i}
              className="rounded-xl px-[22px] py-5"
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                background: "#0e0e10",
              }}
            >
              <div className="font-mono text-[11.5px] tracking-[0.06em] text-accent-indigo mb-2">
                {a.label}
              </div>
              <div className="text-[14.5px] text-[#e0e0df] leading-normal">
                {a.copy}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1160px] mx-auto px-6 md:px-12 py-9 grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.stats.map((s: any, i: number) => (
            <div key={i}>
              <div className="text-[28px] font-bold tracking-[-0.01em]">{s.value}</div>
              <div className="text-[13px] text-text-secondary mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEMS I SOLVE ── */}
      <section className="max-w-[1160px] mx-auto px-6 md:px-12 pt-[80px] md:pt-[120px]">
        <div className="max-w-[640px] mb-14">
          <div className="font-mono text-xs tracking-[0.08em] text-accent-indigo mb-[14px]">
            {t.problems.eyebrow}
          </div>
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.015em] leading-[1.2]">
            {t.problems.heading}
          </h2>
        </div>
        <div className="hairline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {t.problems.items.map((p: string, i: number) => (
            <div key={i} className="px-7 py-7 flex gap-[14px] items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo mt-2 flex-shrink-0" />
              <p className="text-[15px] leading-relaxed text-text-body m-0">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MID CTA ── */}
      <section className="max-w-[1160px] mx-auto px-6 md:px-12 pt-14 pb-16 md:pb-[120px]">
        <div
          className="rounded-[14px] px-6 md:px-11 py-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{
            border: "1px solid rgba(255,255,255,0.09)",
            background: "#0e0e10",
          }}
        >
          <div className="max-w-[640px]">
            <div className="text-[19px] font-semibold mb-2">{t.midCta.heading}</div>
            <p className="text-[14.5px] leading-relaxed text-text-secondary m-0">
              {t.midCta.body}
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-ghost flex-shrink-0 text-[14.5px] font-semibold px-[22px] py-[13px] rounded-[9px] whitespace-nowrap"
            style={{ border: "1px solid rgba(255,255,255,0.16)" }}
          >
            {t.midCta.button}
          </Link>
        </div>
      </section>

      {/* ── OFFERS ── */}
      <section id="offers" className="max-w-[1160px] mx-auto px-6 md:px-12 pb-16 md:pb-[120px]">
        <div className="max-w-[640px] mb-14">
          <div className="font-mono text-xs tracking-[0.08em] text-accent-indigo mb-[14px]">
            {t.offers.eyebrow}
          </div>
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.015em] leading-[1.2] mb-[14px]">
            {t.offers.heading}
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            {t.offers.subheading}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.offers.items.map((o: any, i: number) => (
            <div
              key={i}
              className="offer-card-hover rounded-2xl p-8 flex flex-col transition-[border-color] duration-200"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#111113",
              }}
            >
              <div className="text-[18px] font-semibold mb-1.5">{o.title}</div>
              <div className="font-mono text-sm text-accent-green mb-4">{o.price}</div>
              <p className="text-sm leading-relaxed text-text-secondary mb-5">{o.desc}</p>
              <div className="flex flex-col gap-[9px] mb-7 flex-1">
                {o.includes.map((inc: string, j: number) => (
                  <div key={j} className="flex gap-[9px] items-start text-[13.5px] text-text-bright">
                    <span className="text-accent-indigo mt-[1px]">＋</span>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="btn-ghost text-center text-[14.5px] font-semibold py-3 px-5 rounded-[9px]"
                style={{ border: "1px solid rgba(255,255,255,0.16)" }}
              >
                {o.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CASE STUDIES PREVIEW ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#0c0c0e" }}>
        <div className="max-w-[1160px] mx-auto px-6 md:px-12 py-16 md:py-[120px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-8">
            <div className="max-w-[640px]">
              <div className="font-mono text-xs tracking-[0.08em] text-accent-indigo mb-[14px]">
                {t.caseStudiesSection.eyebrow}
              </div>
              <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.015em] leading-[1.2] mb-[14px]">
                {t.caseStudiesSection.heading}
              </h2>
              <p className="text-base text-text-secondary leading-relaxed">
                {t.caseStudiesSection.subheading}
              </p>
            </div>
            <Link href="/case-studies" className="navlink-hover text-[14.5px] text-text-secondary flex-shrink-0">
              {t.caseStudiesSection.viewAll}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.caseStudies.map((c: any, i: number) => (
              <Link
                key={i}
                href={`/case-studies/${c.slug}`}
                className="case-card-hover block rounded-[14px] p-7 transition-[border-color] duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.09)",
                  background: "#111113",
                }}
              >
                <div className="text-[19px] font-semibold mb-[10px] leading-[1.3]">{c.title}</div>
                <p className="text-sm leading-relaxed text-text-secondary mb-5">{c.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {c.stack.map((tag: string, j: number) => (
                    <span
                      key={j}
                      className="font-mono text-[11.5px] text-text-secondary px-[10px] py-[5px] rounded-md"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ARGONAUTE ── */}
      <section>
        <div className="max-w-[1160px] mx-auto px-6 md:px-12 py-16 md:py-[120px]">
          <div className="max-w-[640px] mb-16">
            <div className="font-mono text-xs tracking-[0.08em] text-accent-indigo mb-[14px]">
              {t.whyArgonaute.eyebrow}
            </div>
            <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.015em] leading-[1.2]">
              {t.whyArgonaute.heading}
            </h2>
          </div>
          <div className="hairline-grid grid-cols-1 md:grid-cols-3">
            {t.whyArgonaute.items.map((item: any, i: number) => (
              <div key={i} className="p-8">
                <div className="text-[20px] font-semibold mb-[10px]">{item.title}</div>
                <p className="text-[14.5px] leading-[1.65] text-text-secondary m-0">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#0c0c0e" }}>
        <div className="max-w-[1160px] mx-auto px-6 md:px-12 py-16 md:py-[120px]">
          <div className="max-w-[640px] mb-16">
            <div className="font-mono text-xs tracking-[0.08em] text-accent-indigo mb-[14px]">
              {t.process.eyebrow}
            </div>
            <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.015em] leading-[1.2]">
              {t.process.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {t.process.steps.map((st: any, i: number) => (
              <div key={i}>
                <div className="font-mono text-[13px] text-accent-indigo mb-4">{st.n}</div>
                <div className="text-[17px] font-semibold mb-[10px]">{st.title}</div>
                <p className="text-sm leading-relaxed text-text-secondary m-0">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIT ── */}
      <section>
        <div className="max-w-[1160px] mx-auto px-6 md:px-12 py-16 md:py-[120px]">
          <div className="max-w-[640px] mb-14">
            <div className="font-mono text-xs tracking-[0.08em] text-accent-indigo mb-[14px]">
              {t.fit.eyebrow}
            </div>
            <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.015em] leading-[1.2]">
              {t.fit.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Good fit */}
            <div
              className="rounded-[14px] p-8"
              style={{
                border: "1px solid rgba(110,231,167,0.2)",
                background: "#111113",
              }}
            >
              <div className="font-mono text-xs tracking-[0.06em] text-accent-green mb-5">
                {t.fit.goodLabel}
              </div>
              {t.fit.good.map((g: string, i: number) => (
                <div key={i} className="flex gap-[10px] items-start mb-[14px]">
                  <span className="text-accent-green text-sm mt-[1px]">✓</span>
                  <span className="text-[14.5px] text-text-body leading-normal">{g}</span>
                </div>
              ))}
            </div>
            {/* Bad fit */}
            <div
              className="rounded-[14px] p-8"
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                background: "#111113",
              }}
            >
              <div className="font-mono text-xs tracking-[0.06em] text-text-muted mb-5">
                {t.fit.badLabel}
              </div>
              {t.fit.bad.map((b: string, i: number) => (
                <div key={i} className="flex gap-[10px] items-start mb-[14px]">
                  <span className="text-text-muted text-sm mt-[1px]">✕</span>
                  <span className="text-[14.5px] text-text-secondary leading-normal">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-[1160px] mx-auto px-6 md:px-12 py-16 md:py-[120px]">
        <div
          className="rounded-[20px] px-8 md:px-16 py-14 md:py-[72px] text-center"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            background: "linear-gradient(180deg,#111113,#0a0a0b)",
          }}
        >
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.015em] leading-[1.25] mb-4 max-w-[680px] mx-auto">
            {t.finalCta.heading}
          </h2>
          <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-[600px] mx-auto">
            {t.finalCta.body}
          </p>
          <div className="flex flex-wrap gap-3.5 items-center justify-center">
            <Link
              href="/contact"
              className="btn-primary text-[15px] font-semibold px-7 py-[15px] rounded-[9px]"
              style={{ background: "#f2f2f1", color: "#0a0a0b" }}
            >
              {t.finalCta.ctaPrimary}
            </Link>
            <Link
              href="/case-studies"
              className="btn-ghost text-[15px] font-medium px-[26px] py-[14px] rounded-[9px]"
              style={{ border: "1px solid rgba(255,255,255,0.14)" }}
            >
              {t.finalCta.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
