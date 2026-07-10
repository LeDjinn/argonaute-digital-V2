// @ts-nocheck
"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Code, Globe, Zap } from "lucide-react"
import { motion } from "framer-motion"

// Aceternity-inspired text components
const TextReveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const letters = Array.from(children as string)

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className={`overflow-hidden ${className} section-text-reveal`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className={letter === " " ? "inline-block w-4" : "inline-block"}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default function NextjsToolsSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  // Track mouse position for effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Features list with animations
  const features = [
    {
      icon: <Globe className="h-5 w-5 text-cyan-400" />,
      title: "Server Components",
      description: "Build faster, more efficient web applications",
    },
    {
      icon: <Zap className="h-5 w-5 text-cyan-400" />,
      title: "App Router",
      description: "Intuitive file-based routing system",
    },
    {
      icon: <Code className="h-5 w-5 text-cyan-400" />,
      title: "API Routes",
      description: "Serverless functions built right in",
    },
  ]

  return (
    <section ref={sectionRef} className="w-full bg-black text-white py-24 relative overflow-hidden section-wrapper">
      {/* Background gradient */}
      <div className="absolute inset-0 section-background">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-cyan-900/20 via-transparent to-transparent opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-cyan-800/10 via-transparent to-transparent opacity-30"></div>
      </div>

      {/* Animated dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-500 rounded-full section-dot"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 10}%`, `${Math.random() * 100}%`],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
          }}
        />
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10 section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center section-grid">
          {/* Image on the left (flipped from React section) */}
          <motion.div
            className="relative order-2 md:order-1 section-image-container"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              {/* Animated glow effect */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-xl opacity-75 blur-sm section-image-glow"
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
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent z-0 section-image-overlay"
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

                <div className="relative">
                  <Image
                    src="/nextjs-dashboard.png"
                    width={800}
                    height={600}
                    alt="Next.js application dashboard"
                    className="rounded-lg w-full h-auto relative z-10 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 section-image"
                    priority
                  />
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/50 z-20 flex items-center space-x-2 section-badge"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-cyan-500">Next.js 15</span>
                </motion.div>

                <motion.div
                  className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-gray-800 z-20 flex items-center space-x-3 section-badge"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: [0, -5, 0],
                    opacity: 1,
                  }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                    opacity: { duration: 0.5, delay: 0.8 },
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px -10px rgba(0, 230, 255, 0.3)",
                  }}
                >
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-400">Build time</div>
                    <div className="text-sm font-medium text-cyan-400">0.25s</div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-cyan-400" />
                  </div>
                </motion.div>

                {/* Additional floating element */}
                <motion.div
                  className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-black/80 backdrop-blur-sm p-2 rounded-lg border border-gray-800 z-20 section-badge"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{
                    x: [0, 5, 0],
                    opacity: 1,
                  }}
                  transition={{
                    x: {
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                    opacity: { duration: 0.5, delay: 1 },
                  }}
                >
                  <div className="flex flex-col items-center">
                    <Code className="h-5 w-5 text-cyan-400 mb-1" />
                    <div className="text-xs text-cyan-400">App Router</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Content on the right */}
          <div className="space-y-8 order-1 md:order-2 section-content">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="section-heading-wrapper"
              >
                {/* Aceternity-inspired heading with letter animation */}
                <TextReveal className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-200 section-heading">
                  Next.js
                </TextReveal>

                <motion.h2
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-100 mt-2 section-heading"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  development
                </motion.h2>
              </motion.div>
            </div>

            <motion.p
              className="text-xl text-gray-400 max-w-xl section-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Build lightning-fast web applications with server-side rendering, static site generation, and seamless API
              integration.
            </motion.p>

            {/* Features list */}
            <div className="space-y-4 section-features">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg hover:bg-cyan-950/30 transition-colors duration-300 section-feature"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="mt-1 h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 section-feature-icon">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-lg section-feature-title">{feature.title}</h3>
                    <p className="text-gray-400 section-feature-description">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
