import { AmbientColor } from "@/components/ambient-color";
import { CTA } from "@/components/cta";
import { FeatureIconContainer } from "@/components/features/feature-icon-container";
import { Heading } from "@/components/heading";
import { Hero } from "@/components/hero";
import { PricingGrid } from "@/components/pricing-grid";
import { Subheading } from "@/components/subheading";
import { Testimonials } from "@/components/testimonials";
import { TestimonialsMarquee } from "@/components/testimonials/marquee";
import { IconReceiptFilled } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Proactiv | Aceternity Templates",
  description:
    "Proactiv is an all in on marketing automation platform that handles emails, tasks tracking, social media management and everything in between.",
  openGraph: {
    images: ["https://proactiv-aceternity.vercel.app/banner.png"],
  },
};

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <div className="py-20 sm:py-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconReceiptFilled className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading as="h1" className="mt-4">
          Simple pricing
        </Heading>
        <Subheading>
          Simple pricing for startups, small businesses, medium scale businesses
          and enterprises.
        </Subheading>
        <PricingGrid />
      </div>
      <div className="pb-40">
        <TestimonialsMarquee />
      </div>
      <CTA />
    </div>
  );
}
