"use client";
import { GlobeDemo } from "@/components/aceternity/GlobeDemo";
import { LampDemo } from "@/components/aceternity/lamp";
import { AmbientColor } from "@/components/ambient-color";
import { AnimatedSvg } from "@/components/animated-svg";
import { Container } from "@/components/container";
import { CTA } from "@/components/cta";
import { BackgroundGradient } from "@/components/custom components/background-gradient";
import CardExperienceCustom from "@/components/custom components/card-experience-custom";
import { CustomCaroussel } from "@/components/custom components/caroussel-custom";
import { FAQs } from "@/components/faqs";
import { Features } from "@/components/features";
import { FeatureIconContainer } from "@/components/features/feature-icon-container";
import { Heading } from "@/components/heading";
import { Hero } from "@/components/hero";
import { PricingGrid } from "@/components/pricing-grid";
import { Subheading } from "@/components/subheading";
import { Testimonials } from "@/components/testimonials";
import { TestimonialsGrid } from "@/components/testimonials/grid";
import { TestimonialsMarquee } from "@/components/testimonials/marquee";
import { TestimonialsSlider } from "@/components/testimonials/slider";
import { Tools } from "@/components/tools";
import { IconReceiptFilled } from "@tabler/icons-react";
import englishText from "@/app/messages/en.json";
import frenchText from "@/app/messages/fr.json";
import { CompactChatbot } from "@/components/chatbot";
import {
  AiIntegrationSection,
  ApiSection,
  ClientLogosSection,
  TechRadarSection,
  WebAppsSection,
} from "@/components/React Tools Section";
import { SectionTransition } from "@/components/shared/section-transition";
import { InterSectionDivider } from "@/components/shared/inter-section-divider";
import { Lamp } from "lucide-react";

export default function Home({
  params,
}: {
  params: {
    topic: string;
    slug: string;
    locale: string;
  };
}) {
  const text = params.locale === "fr" ? frenchText : englishText;

  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <Hero locale={params.locale} />
      <CompactChatbot />
      <SectionTransition />
      <WebAppsSection locale="en" />
      <InterSectionDivider variant="dots" height={60} />
      <ApiSection locale="en" />
      <InterSectionDivider variant="waves" height={80} />
      <AiIntegrationSection locale="en" />
      <InterSectionDivider variant="particles" height={70} />
      <TechRadarSection locale="en" />
      <InterSectionDivider variant="minimal" height={50} />
      <LampDemo locale="en" />
      {/* <ClientLogosSection locale="en" /> */}
      {/* <Features locale={params.locale} />
      <LampDemo locale= {params.locale} />

      <TestimonialsMarquee locale={params.locale} />
      <Tools locale={params.locale} />

      <div className="py-20 sm:py-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconReceiptFilled className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>

        <FAQs locale={params.locale} />
      </div>
      <CTA locale={params.locale} /> */}
    </div>
  );
}
