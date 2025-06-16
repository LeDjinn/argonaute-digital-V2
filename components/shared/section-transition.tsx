"use client";

import React from "react";
import { motion } from "framer-motion";

export const SectionTransition: React.FC = () => {
  return (
    <div className="relative w-full h-32 overflow-hidden">
      {/* Gradient background that transitions from hero to webapp section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950"></div>

      {/* Flowing particles that connect the sections */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#06B0D4]/60 rounded-full"
          initial={{
            x: `${10 + Math.random() * 80}%`,
            y: "-10px",
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: "150px",
            opacity: [0, 0.8, 0.4, 0],
            scale: [0.5, 1, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
          }}
        />
      ))}

      {/* Flowing lines that create connection */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 1200 128"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B0D4" stopOpacity="0" />
            <stop offset="30%" stopColor="#06B0D4" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#06B0D4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06B0D4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Animated flowing lines */}
        {[0, 1, 2].map((lineIndex) => (
          <motion.path
            key={lineIndex}
            d={`M0,${40 + lineIndex * 20} Q300,${20 + lineIndex * 15} 600,${
              40 + lineIndex * 20
            } T1200,${30 + lineIndex * 25}`}
            stroke="url(#flow-gradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: lineIndex * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Subtle geometric elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex space-x-8 opacity-20">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 border border-[#06B0D4]/40 rotate-45"
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 45, 90],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Subtle grid pattern that fades in and out */}
      <motion.div
        className="absolute inset-0 bg-grid-white/[0.01] bg-[size:40px_40px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom border that connects to next section */}
      <div className="absolute bottom-0 left-0 w-full h-px">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-[#06B0D4]/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};
