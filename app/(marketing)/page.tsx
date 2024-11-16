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
const apps = [
  {
    name: "Personal Chatbot",
    description:
      "This AI-powered chatbot is crafted using over 3,000 documents that outline essential company or project information. With a unique knowledge base drawn from these resources, the chatbot can provide accurate, contextually relevant responses tailored to inquiries regarding the company’s services. It is an ideal solution  by delivering precise answers directly from a comprehensive set of internal documents.",
    imageUrl: "/chatbot2.png",
    category: "AI Chatbot",
    users: 10000,
    releaseDate: "2023-06-15",
  },
  {
    name: "Content Creation App",
    description:
      "A comprehensive tool that scans the internet daily for content related to registered keywords. It connects with various tools, utilizing AI to analyze, summarize, and score content relevance. The app creates high-quality, ready-to-publish articles, sending them to a CMS that allows seamless integration into content strategies and immediate accessibility for publishing.",
    imageUrl: "/contentCreationApp.png",
    category: "Content Creation",
    users: 10000,
    releaseDate: "2023-06-15",
  },
  {
    name: "E-commerce Website",
    description:
      "With extensive experience in WooCommerce, Shopify, and Next.js, we develop custom e-commerce platforms tailored to various product lines, from jewelry to sound samples. Our e-commerce solutions are designed with scalability in mind, offering businesses the flexibility to manage products, customers, and sales efficiently. We provide on all popular plateforms.",
    imageUrl: "/eCommerce.png",
    category: "E-commerce",
    users: 10000,
    releaseDate: "2023-06-15",
  },
  {
    name: "Landing Pages and Templating",
    description:
      "A powerful tool that transforms Figma UI designs into functional React components and Next.js templates. This solution ensures seamless conversion from design to code, allowing developers to create attractive, high-performance landing pages and templates that align perfectly with the original design specifications for a consistent user experience.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "Design and Templating",
    users: 10000,
    releaseDate: "2023-06-15",
  },

  {
    name: "Cost Tracking App",
    description:
      "A specialized application designed for factories to track production costs and optimize pricing strategies. By analyzing production expenses in real-time, the app offers actionable pricing insights, helping factories set competitive prices while maintaining profitability. It serves as a strategic tool for financial management within production-heavy industries.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "Cost Management",
    users: 10000,
    releaseDate: "2023-06-15",
  },
  {
    name: "Travel Request App",
    description:
      "An intuitive solution designed to streamline the internal process for travel requests. It helps team members manage travel-related workflows, making expense tracking more efficient during missions, expediting authorization approvals, and simplifying the booking experience. This tool enhances the overall efficiency of travel logistics and boosts the productivity of the buyer’s booking operations.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "Productivity",
    users: 10000,
    releaseDate: "2023-06-15",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <AmbientColor />
      <Hero />
      {/*     
      <div className="  grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3">
        {apps.slice(0, 3).map((app, index) => (
          <CardExperienceCustom key={index} {...app} />
        ))}
      </div> */}
      <Features />
      <LampDemo />

      <TestimonialsMarquee />
      <Tools />

      <div className="py-20 sm:py-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconReceiptFilled className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>

        <FAQs />
      </div>
      <CTA />
    </div>
  );
}
