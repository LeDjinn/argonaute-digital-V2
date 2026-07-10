// @ts-nocheck
"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Code, Globe, Zap, Layers, Smartphone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import webAppsContent from "./locales/web-apps.json";
import { Heading } from "../heading";

// Types
type Locale = "en" | "fr";
type Feature = {
  title: string;
  description: string;
  framework: string;
};
type WebAppsContent = {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
};

// Aceternity-inspired text components
const GradientText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-[#06B0D4] to-[#06B0D4]/70 animate-gradient ${className} section-gradient-text`}
    >
      {children}
    </span>
  );
};

export const WebAppsSection = ({ locale = "en" }: { locale?: Locale }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  // Get content based on locale
  const content: WebAppsContent =
    (webAppsContent as Record<Locale, WebAppsContent>)[locale] ||
    webAppsContent.en;

  // Map icons to features
  const getIconForFeature = (index: number) => {
    const icons = [
      <Layers key="layers" className="h-5 w-5 text-[#06B0D4]" />,
      <Globe key="globe" className="h-5 w-5 text-[#06B0D4]" />,
      <Zap key="zap" className="h-5 w-5 text-[#06B0D4]" />,
      <Smartphone key="smartphone" className="h-5 w-5 text-[#06B0D4]" />,
      <Code key="code" className="h-5 w-5 text-[#06B0D4]" />,
      <Sparkles key="sparkles" className="h-5 w-5 text-[#06B0D4]" />,
    ];
    return icons[index % icons.length];
  };

  // Track mouse position for parallax effects
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
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#06B0D4] rounded-full section-particle"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2,
          }}
          animate={{
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100 - 10}%`,
              `${Math.random() * 100}%`,
            ],
            opacity: [0.3, 0.8, 0.3],
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
          <div className="space-y-8 section-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="section-heading-wrapper"
            >
              <Heading
                as="h2"
                center={false}
                className="text-3xl md:text-3xl lg:text-7xl font-semibold max-w-6xl  mt-6 relative z-10  pt-6 pb-3"
              >
                {content.title}
              </Heading>

              <p className="text-2xl text-gray-300 mt-4">{content.subtitle}</p>
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
                    {getIconForFeature(index)}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-white text-lg section-feature-title">
                        {feature.title}
                      </h3>
                      <span
                        className={`ml-2 text-xs px-2 py-1 rounded-full ${
                          feature.framework === "react"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-[#06B0D4]/20 text-[#06B0D4]"
                        }`}
                      >
                        {feature.framework === "react" ? "React" : "Next.js"}
                      </span>
                    </div>
                    <p className="text-gray-400 section-feature-description">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative section-image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              transform: `perspective(1000px) rotateY(${
                (mousePosition.x - (sectionRef.current?.offsetWidth || 0) / 2) /
                50
              }deg) rotateX(${
                -(
                  mousePosition.y -
                  (sectionRef.current?.offsetHeight || 0) / 2
                ) / 50
              }deg)`,
              transition: "transform 0.1s ease-out",
            }}
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#06B0D4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 section-image-overlay"></div>

                <div className="grid grid-cols-2 gap-1">
                  <div className="relative">
                    <Image
                      src="/home/react-background.png"
                      width={400}
                      height={300}
                      alt="React component visualization"
                      className="rounded-tl-lg w-full h-auto relative z-10 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 section-image"
                      priority
                    />
                  </div>
                  <div className="relative">
                    <Image
                      src="/home/react-dashboard.png"
                      width={400}
                      height={300}
                      alt="Next.js dashboard"
                      className="rounded-tr-lg w-full h-auto relative z-10 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 section-image"
                      priority
                    />
                  </div>
                </div>

                {/* Code snippet */}
                <motion.div
                  className="bg-black/90 backdrop-blur-sm p-3 rounded-b-lg border-t border-gray-800 z-20 section-code"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="font-mono text-xs text-gray-300">
                    <div className="text-gray-500">
                      // Modern React & Next.js
                    </div>
                    <div className="text-[#06B0D4]">
                      export default function{" "}
                      <span className="text-purple-400">Page</span>() {"{"}
                    </div>
                    <div className="pl-4">
                      const [data, setData] ={" "}
                      <span className="text-purple-400">useState</span>([]);
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400">useEffect</span>(()
                      =&gt; {"{"}
                    </div>
                    <div className="pl-8">
                      <span className="text-green-400">fetchData</span>
                      ().then(setData);
                    </div>
                    <div className="pl-4">{"}"}, []);</div>
                    <div className="pl-4">
                      return{" "}
                      <span className="text-purple-400">
                        {"<Dashboard data={data} />"}
                      </span>
                      ;
                    </div>
                    <div>{"}"}</div>
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

export default WebAppsSection;
