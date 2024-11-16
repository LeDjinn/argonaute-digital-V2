"use client";
import React, { useRef } from "react";
import { MacbookScroll } from "./macbook";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./button";
import { HiArrowRight } from "react-icons/hi2";
import { AmbientColor } from "./ambient-color";
import { Container } from "./container";
import { FeaturedImages } from "./featured-images";
import englishText from "@/app/messages/en.json";
import frenchText from "@/app/messages/fr.json";

export const CTA = ({ locale }: { locale: string }) => {
  const text = locale === "fr" ? frenchText.cta : englishText.cta;
  return (
    <div className="relative">
      <AmbientColor />
      <Container className="flex flex-col md:flex-row justify-between items-center w-full px-8">
        <div className="flex flex-col">
          <motion.h2 className="text-white text-xl text-center md:text-left md:text-3xl font-bold mx-auto md:mx-0 max-w-xl ">
            {text.heading}
          </motion.h2>
          <p className="max-w-md mt-8 text-center md:text-left text-sm md:text-base mx-auto md:mx-0 text-neutral-400">
            {text.subheading}
          </p>
        </div>
        <Button className="flex space-x-2 items-center group !text-lg">
          <span>{text.button}</span>
          <HiArrowRight className="text-black group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
        </Button>
      </Container>
      <MacbookScroll src={`/dashboard.png`} showGradient={true} />
    </div>
  );
};
