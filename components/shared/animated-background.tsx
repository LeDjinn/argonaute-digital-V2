"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  particleCount?: number;
  className?: string;
  gradientPosition?: "top" | "bottom" | "center";
  showGrid?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  particleCount = 30,
  className = "",
  gradientPosition = "center",
  showGrid = true,
}) => {
  const getGradientClasses = () => {
    switch (gradientPosition) {
      case "top":
        return "from-[#06B0D4]/15 via-slate-950 to-slate-950/80";
      case "bottom":
        return "from-slate-950/80 via-slate-950 to-[#06B0D4]/15";
      case "center":
      default:
        return "from-[#06B0D4]/15 via-slate-950 to-slate-950/80";
    }
  };

  const getBorderPosition = () => {
    switch (gradientPosition) {
      case "top":
        return "top-0";
      case "bottom":
        return "bottom-0";
      case "center":
      default:
        return "top-0";
    }
  };

  return (
    <>
      {/* Background elements */}
      <div className={`absolute inset-0 section-background ${className}`}>
        <div
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${getGradientClasses()}`}
        ></div>
        <div
          className={`absolute ${getBorderPosition()} left-0 w-full h-px bg-gradient-to-r from-transparent via-[#06B0D4]/40 to-transparent`}
        ></div>
        {showGrid && (
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        )}
      </div>

      {/* Animated particles */}
      {Array.from({ length: particleCount }).map((_, i) => (
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
    </>
  );
};
