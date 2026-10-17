import type { Metadata } from "next";
import enPolicy from "@/app/messages/privacy.en.json";
import frPolicy from "@/app/messages/privacy.fr.json";
import { siteUrl } from "@/lib/site-config";

type PolicyParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PolicyParams): Promise<Metadata> {
  const { locale } = await params;
  const language = locale === "fr" ? "fr" : "en";
  const policy = language === "fr" ? frPolicy : enPolicy;
  const canonical = new URL(`/${language}/privacy-policy`, siteUrl).href;
  return {
    title: `${policy.title} | Argonaute Digital`,
    description: policy.description,
    alternates: {
      canonical,
      languages: {
        en: new URL("/en/privacy-policy", siteUrl).href,
        fr: new URL("/fr/privacy-policy", siteUrl).href,
        "x-default": new URL("/en/privacy-policy", siteUrl).href,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${policy.title} | Argonaute Digital`,
      description: policy.description,
      url: canonical,
      type: "website",
      locale: language === "fr" ? "fr_FR" : "en_US",
      images: ["/banner.png"],
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const policy = locale === "fr" ? frPolicy : enPolicy;

  return (
    <div className="relative mx-auto max-w-[1160px] px-6 py-16 md:px-12 md:py-24">
      <header className="mb-10 max-w-[780px]">
        <p className="mb-4 font-mono text-xs tracking-[0.08em] text-accent-indigo">{policy.eyebrow}</p>
        <h1 className="mb-5 text-[36px] font-bold leading-[1.1] tracking-[-0.02em] md:text-[52px]">{policy.title}</h1>
        <p className="mb-5 text-sm text-text-tertiary">{policy.updated}</p>
        <p className="text-base leading-relaxed text-text-secondary">{policy.intro}</p>
      </header>

      <div className="grid min-w-0 gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label={policy.contentsLabel} className="h-fit rounded-2xl border border-white/10 bg-[#111113] p-6 lg:sticky lg:top-24">
          <p className="mb-4 text-sm font-semibold text-text-primary">{policy.contentsLabel}</p>
          <ol className="space-y-3 text-sm leading-relaxed text-text-secondary">
            {policy.sections.map((section) => (
              <li key={section.id}><a href={`#${section.id}`} className="transition-colors hover:text-accent-indigo">{section.title}</a></li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0 max-w-[760px] space-y-10 [overflow-wrap:anywhere]">
          {policy.sections.map((section) => (
            <section id={section.id} key={section.id} className="scroll-mt-28 border-t border-white/10 pt-8 first:border-0 first:pt-0" aria-labelledby={`${section.id}-heading`}>
              <h2 id={`${section.id}-heading`} className="mb-4 text-[23px] font-semibold leading-snug tracking-[-0.01em]">{section.title}</h2>
              <div className="space-y-4 text-[15px] leading-[1.8] text-text-secondary">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}

          <section aria-labelledby="provider-resources" className="rounded-2xl border border-white/10 bg-[#111113] p-6 md:p-8">
            <h2 id="provider-resources" className="mb-4 text-xl font-semibold">{policy.resourcesTitle}</h2>
            <ul className="space-y-3 text-sm leading-relaxed">
              {policy.resources.map((resource) => (
                <li key={resource.href}><a href={resource.href} rel="noopener noreferrer" className="text-text-secondary underline underline-offset-4 hover:text-accent-indigo">{resource.label}</a></li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/10 pt-6 text-sm text-text-secondary">
              {policy.contactLabel}: <a href={`mailto:${policy.contactEmail}`} className="underline underline-offset-4 hover:text-accent-indigo">{policy.contactEmail}</a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
