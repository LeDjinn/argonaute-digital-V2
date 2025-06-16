"use client";

import React from "react";
import { motion } from "framer-motion";

interface InterSectionDividerProps {
  variant?: "dots" | "waves" | "particles" | "minimal";
  height?: number;
  className?: string;
}

export const InterSectionDivider: React.FC<InterSectionDividerProps> = ({
  variant = "minimal",
  height = 80,
  className = "",
}) => {
  const renderVariant = () => {
    switch (variant) {
      case "dots":
        return (
          <>
            {/* Flowing dots pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex space-x-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-[#06B0D4]/50 rounded-full"
                    initial={{ scale: 0.5, opacity: 0.3 }}
                    animate={{
                      scale: [0.5, 1.2, 0.5],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        );

      case "waves":
        return (
          <>
            {/* Animated wave lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              viewBox={`0 0 1200 ${height}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="wave-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#06B0D4" stopOpacity="0" />
                  <stop offset="50%" stopColor="#06B0D4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06B0D4" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 1].map((waveIndex) => (
                <motion.path
                  key={waveIndex}
                  d={`M0,${height / 2 + waveIndex * 10} Q300,${
                    height / 3
                  } 600,${height / 2 + waveIndex * 10} T1200,${
                    height / 2 - waveIndex * 5
                  }`}
                  stroke="url(#wave-gradient)"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: waveIndex * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>
          </>
        );

      case "particles":
        return (
          <>
            {/* Floating particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#06B0D4]/40 rounded-full"
                initial={{
                  x: `${20 + Math.random() * 60}%`,
                  y: `${height}px`,
                  opacity: 0,
                }}
                animate={{
                  y: `-10px`,
                  opacity: [0, 0.6, 0],
                  x: `${20 + Math.random() * 60 + (Math.random() - 0.5) * 40}%`,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeOut",
                }}
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                }}
              />
            ))}
          </>
        );

      case "minimal":
      default:
        return (
          <>
            {/* Simple gradient line */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-32 h-px bg-gradient-to-r from-transparent via-[#06B0D4]/30 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950/20"></div>

      {renderVariant()}

      {/* Subtle grid overlay */}
      <motion.div
        className="absolute inset-0 bg-grid-white/[0.005] bg-[size:30px_30px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
