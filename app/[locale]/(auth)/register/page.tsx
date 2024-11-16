import { AmbientColor } from "@/components/ambient-color";
import { AnimatedSvg } from "@/components/animated-svg";
import { Container } from "@/components/container";
import { CTA } from "@/components/cta";
import { Features } from "@/components/features";
import { FeatureIconContainer } from "@/components/features/feature-icon-container";
import { Heading } from "@/components/heading";
import { Hero } from "@/components/hero";
import { PricingGrid } from "@/components/pricing-grid";
import { Register } from "@/components/register";
import { Subheading } from "@/components/subheading";
import { Testimonials } from "@/components/testimonials";
import { TestimonialsSlider } from "@/components/testimonials/slider";
import { Tools } from "@/components/tools";
import { IconReceiptFilled } from "@tabler/icons-react";

export default function RegisterPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <Register />
    </div>
  );
}
