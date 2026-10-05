import Link from "next/link";
import enText from "@/app/messages/en.json";
import frText from "@/app/messages/fr.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Argonaute Digital",
  description:
    "Real problems, real architecture decisions, real outcomes. See how engagements are scoped, built, and delivered.",
  openGraph: {
    images: ["/banner.png"],
  },
};

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const t = resolvedParams.locale === "fr" ? frText : enText;
  const page = t.caseStudiesPage;
  const cases = t.caseStudies;

  return (
    <div className="relative">
      {/* Header */}
      <section className="max-w-[1160px] mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="font-mono text-xs tracking-[0.08em] text-accent-indigo mb-[14px]">
          {page.eyebrow}
        </div>
        <h1 className="text-[32px] md:text-[48px] font-bold tracking-[-0.02em] leading-[1.15] mb-4 max-w-[720px]">
          {page.heading}
        </h1>
        <p className="text-[17px] text-text-secondary max-w-[600px] leading-relaxed">
          {page.subheading}
        </p>
      </section>

      {/* Case grid */}
      <section className="max-w-[1160px] mx-auto px-6 md:px-12 pb-20 md:pb-[140px] grid grid-cols-1 md:grid-cols-2 gap-5">
        {cases.map((c: any, i: number) => (
          <Link
            key={i}
            href={`/case-studies/${c.slug}`}
            className="case-card-hover block rounded-2xl p-7 md:p-9 transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.09)",
              background: "#111113",
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="font-mono text-[11.5px] tracking-[0.06em] text-accent-indigo">
                {c.tag}
              </div>
              <div className="text-[13px] text-accent-green font-mono">{c.impact}</div>
            </div>
            <div className="text-[22px] font-semibold mb-3 leading-[1.3]">{c.title}</div>
            <p className="text-[14.5px] leading-[1.65] text-text-secondary mb-6">
              {c.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {c.stack.map((tech: string, j: number) => (
                <span
                  key={j}
                  className="font-mono text-[11.5px] text-text-secondary px-[10px] py-[5px] rounded-md"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>

      {/* Simple footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1160px] mx-auto px-6 md:px-12 py-8 flex justify-between text-[12.5px] text-text-tertiary">
          <span>{t.footer.copyright}</span>
          <Link href="/" className="navlink-hover text-text-tertiary">
            {page.backHome}
          </Link>
        </div>
      </footer>
    </div>
  );
}
