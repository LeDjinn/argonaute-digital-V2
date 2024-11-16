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

export const Tools = () => {
  const content = [
    {
      icon: <IconLayoutGrid className="h-8 w-8 text-secondary" />,

      title: "Custom Websites and Templates",
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
      title: " E-commerce and Custom App Integration",
      description:
        "Build and integrate custom applications and e-commerce platforms with seamless workflows, tailored features, and robust reporting capabilities.",
      content: (
        <ImageContainer>
          <FuturisticShape />
        </ImageContainer>
      ),
    },
    {
      icon: <IconSocial className="h-8 w-8 text-secondary" />,
      title: "Seamless Tool Integration",
      description:
        "Connect your favorite tools and platforms with custom integrations to streamline workflows and reduce manual effort.",
      content: (
        <ImageContainer>
          <CubeControl />
        </ImageContainer>
      ),
    },
  ];
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
        <Heading className="mt-4">The Right Tools for Every Job</Heading>
        <Subheading>
          Proactiv offers tools designed to meet your needs and get the job done
          efficiently.
        </Subheading>
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
