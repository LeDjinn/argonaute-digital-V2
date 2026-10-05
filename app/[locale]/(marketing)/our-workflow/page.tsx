import { AmbientColor } from "@/components/ambient-color";
import { CTA } from "@/components/cta";
import { CustomTimeline } from "@/components/custom components/CustomTimeline";
import { Features } from "@/components/features";
import { FeaturesGrid } from "@/components/features/features-grid";
import { Testimonials } from "@/components/testimonials";
import { Tools } from "@/components/tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Workflow | Argonaute Digital",
  description:
    "How I work: a clear, senior-led engineering process from discovery and architecture through delivery and long-term support. No handoffs to juniors.",
  openGraph: {
    images: ["/banner.png"],
  },
};

export default async function PricingPage({
  params,
}: {
  params: Promise<{ topic: string; slug: string; locale: string }>;
}) {
  const resolvedParams = await params;
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <CustomTimeline locale={resolvedParams.locale}/>

      <FeaturesGrid locale ={resolvedParams.locale}/>

      <div className="pb-40">
        <Testimonials />
      </div>
    </div>
  );
}
