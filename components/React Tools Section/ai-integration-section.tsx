// @ts-nocheck
"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Brain,
  MessageSquare,
  ImageIcon,
  Sparkles,
  Bot,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import aiContent from "./locales/ai-integration.json";
import { Heading } from "../heading";

// Types
type Locale = "en" | "fr";
type Feature = {
  title: string;
  description: string;
  category: string;
};
type CodeSnippet = {
  title: string;
  code: string[];
};
type Model = {
  name: string;
  color: string;
};
type AiContent = {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  codeSnippet: CodeSnippet;
  models: Model[];
};

// Aceternity-inspired text components
const GlowingText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={`relative inline-block ${className} section-glowing-text`}>
      <span className="absolute inset-0 blur-sm bg-[#06B0D4]/30 rounded-lg"></span>
      <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-[#06B0D4]/70 to-[#06B0D4]">
        {children}
      </span>
    </span>
  );
};

export const AiIntegrationSection = ({
  locale = "en",
}: {
  locale?: Locale;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  // Get content based on locale
  const content: AiContent =
    (aiContent as Record<Locale, AiContent>)[locale] || aiContent.en;

  // Map icons to features
  const getIconForFeature = (index: number, category: string) => {
    if (category === "chat")
      return index % 2 === 0 ? (
        <MessageSquare className="h-5 w-5 text-[#06B0D4]" />
      ) : (
        <Bot className="h-5 w-5 text-[#06B0D4]" />
      );

    if (category === "content")
      return index % 2 === 0 ? (
        <ImageIcon className="h-5 w-5 text-[#06B0D4]" />
      ) : (
        <Sparkles className="h-5 w-5 text-[#06B0D4]" />
      );

    return index % 2 === 0 ? (
      <Zap className="h-5 w-5 text-[#06B0D4]" />
    ) : (
      <Brain className="h-5 w-5 text-[#06B0D4]" />
    );
  };

  // Track mouse position for effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950 text-white py-24 relative overflow-hidden section-wrapper"
    >
      {/* Background elements */}
      <div className="absolute inset-0 section-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#06B0D4]/15 via-slate-950 to-slate-950/80"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#06B0D4]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      </div>

      {/* Animated particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#06B0D4] rounded-full section-particle"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2,
            scale: Math.random() * 1.5 + 0.5,
          }}
          animate={{
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100 - 10}%`,
              `${Math.random() * 100}%`,
            ],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, Math.random() * 1.5 + 0.8, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            boxShadow: "0 0 10px #06B0D4",
          }}
        />
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10 section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center section-grid">
          {/* Content on the left */}
          <div className="space-y-8 section-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="section-heading-wrapper"
            >
              <Heading
                as="h2"
                className="text-4xl md:text-4xl lg:text-8xl font-semibold max-w-6xl mx-auto text-center mt-6 relative z-10  pt-6 pb-3"
              >
                <span className=" text-[#06B0D4] ">{content.title} </span>
                <span className="ml-2  ">{content.subtitle}</span>
              </Heading>
            </motion.div>

            <motion.p
              className="text-xl text-gray-400 max-w-xl section-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {content.description}
            </motion.p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 section-features">
              {content.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg hover:bg-[#06B0D4]/10 transition-colors duration-300 section-feature"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mt-1 h-10 w-10 rounded-full bg-[#06B0D4]/20 flex items-center justify-center shrink-0 section-feature-icon">
                    {getIconForFeature(index, feature.category)}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-white text-lg section-feature-title">
                        {feature.title}
                      </h3>
                      <span
                        className={`ml-2 text-xs px-2 py-1 rounded-full 
                        ${
                          feature.category === "chat"
                            ? "bg-purple-500/20 text-purple-300"
                            : feature.category === "automation"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-pink-500/20 text-pink-300"
                        }`}
                      >
                        {feature.category === "chat"
                          ? "Chat"
                          : feature.category === "automation"
                          ? "Automation"
                          : "Content"}
                      </span>
                    </div>
                    <p className="text-gray-400 section-feature-description">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Code example */}
            <motion.div
              className="bg-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-800 p-4 section-code-snippet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{
                boxShadow: "0 0 20px rgba(6, 176, 212, 0.2)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="font-mono text-sm">
                <div className="text-gray-500">
                  // {content.codeSnippet.title}
                </div>
                {content.codeSnippet.code.map((line, index) => (
                  <div
                    key={index}
                    className={
                      line.includes("import")
                        ? "text-[#06B0D4]"
                        : line.includes("const")
                        ? "text-[#06B0D4]"
                        : line.includes("model:")
                        ? "pl-4"
                        : line.includes("prompt:")
                        ? "pl-4"
                        : ""
                    }
                  >
                    {line.includes("openai") ? (
                      <>
                        model: <span className="text-purple-400">openai</span>(
                        <span className="text-green-400">"gpt-4o"</span>),
                      </>
                    ) : line.includes("prompt:") ? (
                      <>
                        prompt:{" "}
                        <span className="text-green-400">
                          {line.split(":")[1].trim()}
                        </span>
                      </>
                    ) : (
                      line
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image on the right */}
          <motion.div
            className="relative section-image-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              {/* Animated glow effect */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#06B0D4] to-[#06B0D4]/70 rounded-xl opacity-75 blur-sm section-image-glow"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              ></motion.div>

              <div className="relative bg-black rounded-xl p-1 overflow-hidden section-image-wrapper">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#06B0D4]/10 to-transparent z-0 section-image-overlay"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                ></motion.div>

                <Image
                  src="/home/ai-integrations.png"
                  width={800}
                  height={600}
                  alt="AI integration visualization"
                  className="rounded-lg w-full h-auto relative z-10 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 section-image"
                  priority
                />

                {/* Floating elements */}
                <motion.div
                  className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#06B0D4]/50 z-20 flex items-center space-x-2 section-badge"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="h-2 w-2 bg-[#06B0D4] rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-[#06B0D4]">
                    AI SDK
                  </span>
                </motion.div>

                {/* AI Models Badge */}
                <motion.div
                  className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-sm p-3 rounded-lg border border-gray-800 z-20 section-badge"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -10px rgba(6, 176, 212, 0.3)",
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {content.models.map((model, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div
                          className={`h-2 w-2 bg-${model.color}-500 rounded-full`}
                        ></div>
                        <span className={`text-xs text-${model.color}-400`}>
                          {model.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AiIntegrationSection;
