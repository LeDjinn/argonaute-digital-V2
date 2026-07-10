// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id = "tsparticles",
    className,
    background = "transparent",
    particleSize = 2,
    minSize = 0.1,
    maxSize = 2,
    speed = 1,
    particleColor = "#06b6d4",
    particleDensity = 100,
  } = props;
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    return Promise.resolve();
  };

  return (
    <div className={cn("absolute inset-0 w-full h-full", className)}>
      {init && (
        <Particles
          id={id}
          className={className}
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: background,
              },
            },
            fullScreen: {
              enable: false,
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: particleColor,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: speed,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: Math.min(50, particleDensity / 2),
              },
              opacity: {
                value: 0.4,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: minSize, max: maxSize },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </div>
  );
};
