import { AmbientColor } from "@/components/ambient-color";
import { CTA } from "@/components/cta";
import { CustomTimeline } from "@/components/custom components/CustomTimeline";
import { Features } from "@/components/features";
import { FeaturesGrid } from "@/components/features/features-grid";
import { Testimonials } from "@/components/testimonials";
import { Tools } from "@/components/tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | Argonaute Digital",
  description:
    "Argonaute Digital offers comprehensive digital solutions, including API integration, custom software, and SaaS for seamless business operations.",
  openGraph: {
    images: ["https://argonaute-digital.vercel.app/banner.png"],
  },
};

export default function PricingPage({
  params,
}: {
  params: { topic: string; slug: string; locale: string };
}) {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <CustomTimeline locale={params.locale}/>

      <FeaturesGrid locale ={params.locale}/>

      <div className="pb-40">
        <Testimonials />
      </div>
    </div>
  );
}
