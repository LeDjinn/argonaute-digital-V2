"use client";
import React from "react";
import { TestimonialsSlider } from "./slider";
import { FeatureIconContainer } from "../features/feature-icon-container";
import { Heading } from "../heading";
import { Subheading } from "../subheading";
import { TbLocationBolt } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { testimonialsEnglish } from "@/constants/page-testimonials";
import Image from "next/image";
import { TestimonialsGrid } from "./grid";
import { AmbientColor } from "../ambient-color";
import Marquee from "react-fast-marquee";
import { TestimonialsMarquee } from "./marquee";
import { get } from "http";
import { getCookie } from "@/lib/cookies";
import frenchText from "@/app/messages/fr.json";
import englishText from "@/app/messages/en.json";

export const Testimonials = () => {
  const cookie = getCookie("NEXT_LOCALE") || "en";
  const text =
    cookie === "fr" ? frenchText.testimonials : englishText.testimonials;
  return (
    <div className="relative">
      <AmbientColor />
      <div className="pb-20">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <TbLocationBolt className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading className="pt-4">{text.heading}</Heading>
        <Subheading>{text.subheading}</Subheading>
      </div>

      <div className="py-60 relative">
        <div className="absolute inset-0 h-full w-full bg-charcoal opacity-30 [mask-image:radial-gradient(circle_at_center,transparent_10%,white_90%)]">
          <TestimonialsGrid locale={cookie} />
        </div>
        <TestimonialsSlider locale={cookie} />
      </div>
      <div className="absolute bottom-0 inset-x-0 h-40 w-full bg-gradient-to-t from-charcoal to-transparent"></div>
    </div>
  );
};
