"use client";
import { motion, useMotionValueEvent } from "framer-motion";
import React, { useRef, useState } from "react";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { StickyScroll } from "./ui/sticky-scroll";
import { AiOutlineGlobal } from "react-icons/ai";
import {
  IconLayoutGrid,
  IconMailForward,
  IconSocial,
  IconTerminal,
  IconTool,
} from "@tabler/icons-react";
import { useScroll } from "framer-motion";
import { BlurImage } from "./blur-image";
import { Globe } from "./aceternity/globe";
import { GlobeDemo } from "./aceternity/GlobeDemo";
import CubeControl from "./custom components/cube/CubeControl";
import FuturisticShape from "./custom components/cube/FuturisticShape";
import englishText from "@/app/messages/en.json";
import frenchText from "@/app/messages/fr.json";

export const Tools = ({ locale }: { locale: string }) => {
  const text = locale === "fr" ? frenchText.tools : englishText.tools;
  const contentFr = [
    {
      icon: <IconLayoutGrid className="h-8 w-8 text-secondary" />,
      title: "Sites Web Personnalisés ",
      description:
        "Créez des sites web réactifs et attrayants visuellement, adaptés à votre marque, avec des modèles conçus pour une expérience utilisateur fluide.",
      content: (
        <ImageContainer>
          <GlobeDemo />
        </ImageContainer>
      ),
    },
    {
      icon: <IconTerminal className="h-8 w-8 text-secondary" />,
      title: "Plateformes E-commerce ",
      description:
        "Spécialistes de Shopify, nous créons et intégrons des applications sur mesure ainsi que des plateformes e-commerce performantes, avec des fonctionnalités adaptées et un reporting avancé.",
      content: (
        <ImageContainer>
          <FuturisticShape />
        </ImageContainer>
      ),
    },
    {
      icon: <IconSocial className="h-8 w-8 text-secondary" />,
      title: "Creation de software sur mesure.",
      description:
        "Nous développons des logiciels sur mesure pour connecter vos outils et automatiser vos processus.",
      content: (
        <ImageContainer>
          <CubeControl />
        </ImageContainer>
      ),
    },
  ];
  const contentEn = [
    {
      icon: <IconLayoutGrid className="h-8 w-8 text-secondary" />,

      title: "Custom Websites",
      description:
        "Create responsive and visually appealing websites tailored to your brand, with templates designed for seamless user experiences.",
      content: (
        <ImageContainer>
          <GlobeDemo />
        </ImageContainer>
      ),
    },

    {
      icon: <IconTerminal className="h-8 w-8 text-secondary" />,
      title: " E-commerce Platforms",
      description:
        "As Shopify specialists, we develop and integrate custom applications and high-performance e-commerce platforms with tailored features and advanced reporting capabilities.",
      content: (
        <ImageContainer>
          <FuturisticShape />
        </ImageContainer>
      ),
    },
    {
      icon: <IconSocial className="h-8 w-8 text-secondary" />,
      title: "Custom Softwares",
      description:
        "We build custom software to connect your tools and automate processes.",
      content: (
        <ImageContainer>
          <CubeControl />
        </ImageContainer>
      ),
    },
  ];
  const content = locale === "fr" ? contentFr : contentEn;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const backgrounds = [
    "var(--charcoal)",
    "var(--neutral-900)",
    "var(--gray-900)",
  ];
  const index = Math.round(scrollYProgress.get() * (backgrounds.length - 1));

  const [gradient, setGradient] = useState(backgrounds[0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / content.length);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setGradient(backgrounds[closestBreakpointIndex % backgrounds.length]);
  });
  return (
    <motion.div
      animate={{
        background: gradient,
      }}
      transition={{
        duration: 0.5,
      }}
      ref={ref}
      className="w-full relative h-full pt-20 md:pt-40"
    >
      <div className="px-6">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconTool className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading className="mt-4">{text.heading}</Heading>
        <Subheading>{text.subheading}</Subheading>
      </div>
      <StickyScroll content={content} />
    </motion.div>
  );
};

const ImageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg relative shadow-2xl">
      {children}
      <div className="absolute bottom-0 w-full h-px inset-x-0 bg-gradient-to-r from-transparent via-secondary to-transparent" />
      <div className="absolute bottom-0 w-40 mx-auto h-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </div>
  );
};
