import Link from "next/link";
import { notFound } from "next/navigation";
import enText from "@/app/messages/en.json";
import frText from "@/app/messages/fr.json";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const t = resolvedParams.locale === "fr" ? frText : enText;
  const cs = t.caseStudies.find((c: any) => c.slug === resolvedParams.slug);
  return {
    title: cs ? `${cs.title} | Argonaute Digital` : "Case Study | Argonaute Digital",
    description: cs?.summary ?? "",
  };
}

export function generateStaticParams() {
  return enText.caseStudies.map((c: any) => ({ slug: c.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const t = resolvedParams.locale === "fr" ? frText : enText;
  const detail = t.caseStudyDetail;
  const cs = t.caseStudies.find((c: any) => c.slug === resolvedParams.slug);

  if (!cs) {
    notFound();
  }

  return (
    <div className="relative">
      {/* Header */}
      <section className="max-w-[820px] mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-12">
        <Link
          href="/case-studies"
          className="navlink-hover text-[13.5px] text-text-secondary inline-block mb-7"
        >
          {detail.backLink}
        </Link>

        <div className="font-mono text-xs tracking-[0.08em] text-accent-indigo mb-4">
          {cs.tag}
        </div>

        <h1 className="text-[32px] md:text-[42px] font-bold tracking-[-0.02em] leading-[1.18] mb-5">
          {cs.title}
        </h1>

        <p className="text-[17px] text-text-secondary leading-relaxed mb-10">
          {cs.summary}
        </p>

        {/* Meta row */}
        <div
          className="grid grid-cols-3 gap-4 py-7 mb-14"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.09)",
            borderBottom: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <div>
            <div className="text-xs text-text-tertiary mb-1.5">{detail.clientLabel}</div>
            <div className="text-[14.5px]">{cs.client}</div>
          </div>
          <div>
            <div className="text-xs text-text-tertiary mb-1.5">{detail.roleLabel}</div>
            <div className="text-[14.5px]">{cs.role}</div>
          </div>
          <div>
            <div className="text-xs text-text-tertiary mb-1.5">{detail.timelineLabel}</div>
            <div className="text-[14.5px]">{cs.timeline}</div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="max-w-[820px] mx-auto px-6 md:px-12 pb-14">
        <div className="text-[13px] font-mono text-accent-indigo mb-[14px]">
          {detail.challengeLabel}
        </div>
        <p className="text-base leading-[1.75] text-text-body">
          {cs.challenge}
        </p>
      </section>

      {/* Solution */}
      <section className="max-w-[820px] mx-auto px-6 md:px-12 pb-14">
        <div className="text-[13px] font-mono text-accent-indigo mb-[14px]">
          {detail.solutionLabel}
        </div>
        <p className="text-base leading-[1.75] text-text-body mb-5">
          {cs.solution}
        </p>
        <div className="flex flex-wrap gap-2">
          {cs.stack.map((tech: string, j: number) => (
            <span
              key={j}
              className="font-mono text-xs text-text-secondary px-3 py-1.5 rounded-md"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Outcome */}
      <section className="max-w-[820px] mx-auto px-6 md:px-12 pb-16 md:pb-[72px]">
        <div className="text-[13px] font-mono text-accent-indigo mb-[14px]">
          {detail.outcomeLabel}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          {cs.outcomes.map((o: any, i: number) => (
            <div
              key={i}
              className="rounded-xl p-[22px]"
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                background: "#111113",
              }}
            >
              <div className="text-[26px] font-bold text-accent-green">{o.value}</div>
              <div className="text-[13px] text-text-secondary mt-1.5">{o.label}</div>
            </div>
          ))}
        </div>
        <p className="text-base leading-[1.75] text-text-body">
          {cs.closingParagraph}
        </p>
      </section>

      {/* Closing CTA */}
      <section className="max-w-[820px] mx-auto px-6 md:px-12 pb-20 md:pb-[140px]">
        <div
          className="rounded-[18px] px-8 md:px-12 py-12 text-center"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            background: "linear-gradient(180deg,#111113,#0a0a0b)",
          }}
        >
          <h2 className="text-[22px] md:text-[26px] font-bold tracking-[-0.01em] mb-3">
            {detail.closingCtaHeading}
          </h2>
          <p className="text-[15px] text-text-secondary mb-[26px]">
            {detail.closingCtaBody}
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-block text-[15px] font-semibold px-[26px] py-[14px] rounded-[9px]"
            style={{ background: "#f2f2f1", color: "#0a0a0b" }}
          >
            {detail.closingCtaButton}
          </Link>
        </div>
      </section>

      {/* Simple footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1160px] mx-auto px-6 md:px-12 py-8 flex justify-between text-[12.5px] text-text-tertiary">
          <span>{t.footer.copyright}</span>
          <Link href="/case-studies" className="navlink-hover text-text-tertiary">
            {detail.backFooter}
          </Link>
        </div>
      </footer>
    </div>
  );
}
