// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Database, Layout, Server, Workflow, Zap, Brain } from "lucide-react";
import { useRouter } from "next/navigation";
import techRadarContent from "./locales/tech-radar.json";
import { TechIcon } from "./utils/tech-icons";
import { Heading } from "../heading";

// Types
type Locale = "en" | "fr";
type Tool = {
  name: string;
  icon: string;
  level: string;
};
type Category = {
  name: string;
  description: string;
  tools: Tool[];
};
type LevelDescriptions = {
  core: string;
  preferred: string;
  experimental: string;
};
type Stat = {
  value: string;
  label: string;
};
type TechRadarContent = {
  title: string;
  description: string;
  categories: Category[];
  levelDescriptions: LevelDescriptions;
  stats: Stat[];
};

export const TechRadarSection = ({ locale = "en" }: { locale?: Locale }) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  // Get content based on locale
  const content: TechRadarContent =
    (techRadarContent as Record<Locale, TechRadarContent>)[locale] ||
    techRadarContent.en;

  // Set initial active category
  useEffect(() => {
    if (content.categories && content.categories.length > 0) {
      setActiveCategory(content.categories[0].name);
    }
  }, [content.categories]);

  // Animate category change
  useEffect(() => {
    controls.start({
      opacity: [0.5, 1],
      scale: [0.95, 1],
      transition: { duration: 0.5 },
    });
  }, [activeCategory, controls]);

  // Get icon for category
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Frontend":
      case "Frontend":
        return <Layout className="h-5 w-5 text-[#06B0D4]" />;
      case "Backend":
      case "Backend":
        return <Server className="h-5 w-5 text-[#06B0D4]" />;
      case "Database":
      case "Base de Données":
        return <Database className="h-5 w-5 text-[#06B0D4]" />;
      case "AI & ML":
      case "IA & ML":
        return <Brain className="h-5 w-5 text-[#06B0D4]" />;
      case "DevOps":
        return <Workflow className="h-5 w-5 text-[#06B0D4]" />;
      case "Testing":
      case "Tests":
        return <Zap className="h-5 w-5 text-[#06B0D4]" />;
      default:
        return <Layout className="h-5 w-5 text-[#06B0D4]" />;
    }
  };

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
        {/* Section header */}
        <div className="text-center mb-16 section-header">
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
              {content.title}
            </Heading>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto section-description">
              {content.description}
            </p>
          </motion.div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 section-tabs">
          {content.categories.map((category, index) => (
            <motion.button
              key={category.name}
              className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 ${
                activeCategory === category.name
                  ? "bg-gradient-to-r bg-[#06B0D4]/20 border border-[#06B0D4]/50 text-white"
                  : "bg-gray-900/50 border border-gray-800 text-gray-400 hover:bg-gray-800/50 hover:text-gray-300"
              }`}
              onClick={() => setActiveCategory(category.name)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{getCategoryIcon(category.name)}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Tech radar visualization */}
        <div className="relative section-radar">
          {content.categories
            .filter((category) => category.name === activeCategory)
            .map((category) => (
              <motion.div
                key={category.name}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                animate={controls}
              >
                {/* Category info */}
                <div className="space-y-6 md:col-span-1">
                  <motion.div
                    className={`p-6 rounded-xl bg-secondary bg-opacity-10 border border-gray-800`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className={`h-10 w-10 rounded-full bg-gradient-to-r from-[#06B0D4] to-[#06B0D4]/70 flex items-center justify-center`}
                      >
                        {getCategoryIcon(category.name)}
                      </div>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                    </div>
                    <p className="text-gray-300">{category.description}</p>

                    {/* Legend */}
                    <div className="mt-6 space-y-3">
                      <h4 className="text-sm uppercase text-gray-400 font-semibold">
                        Technology Levels
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(content.levelDescriptions).map(
                          ([level, description]) => (
                            <div
                              key={level}
                              className="flex items-center space-x-2"
                            >
                              <div
                                className={`h-3 w-3 rounded-full ${
                                  level === "core"
                                    ? "bg-green-500"
                                    : level === "preferred"
                                    ? "bg-yellow-500"
                                    : "bg-purple-500"
                                }`}
                              ></div>
                              <div>
                                <span className="text-sm font-medium capitalize">
                                  {level}
                                </span>
                                <span className="text-xs text-gray-400 ml-2">
                                  {description}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Tools grid */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {category.tools.map((tool, index) => (
                      <motion.div
                        key={tool.name}
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                        onHoverStart={() => setHoveredTool(tool.name)}
                        onHoverEnd={() => setHoveredTool(null)}
                      >
                        <div
                          className={`p-6 rounded-xl bg-gray-900/50 border ${
                            hoveredTool === tool.name
                              ? "border-[#06B0D4]/50 shadow-lg shadow-[#06B0D4]/10"
                              : "border-gray-800"
                          } transition-all duration-300 h-full flex flex-col items-center justify-center text-center`}
                        >
                          <div
                            className={`h-16 w-16 mb-4 rounded-xl p-2 flex items-center justify-center ${
                              tool.level === "core"
                                ? "bg-green-500/10 border border-green-500/30"
                                : tool.level === "preferred"
                                ? "bg-yellow-500/10 border border-yellow-500/30"
                                : "bg-purple-500/10 border border-purple-500/30"
                            }`}
                          >
                            <TechIcon
                              name={tool.name}
                              className={`h-10 w-10 ${
                                tool.level === "core"
                                  ? "text-green-400"
                                  : tool.level === "preferred"
                                  ? "text-yellow-400"
                                  : "text-purple-400"
                              }`}
                            />
                          </div>
                          <h3 className="text-lg font-medium">{tool.name}</h3>
                          <span
                            className={`mt-2 text-xs px-2 py-1 rounded-full ${
                              tool.level === "core"
                                ? "bg-green-500/20 text-green-300"
                                : tool.level === "preferred"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-purple-500/20 text-purple-300"
                            }`}
                          >
                            {tool.level}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Bottom section with stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 section-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {content.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-[#06B0D4]/20 rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="text-4xl font-bold text-[#06B0D4] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechRadarSection;
