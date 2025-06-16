"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

// Aceternity-inspired text components
const ShimmerText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className} section-shimmer-text`}>
      <div className="relative z-10">{children}</div>
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        style={{
          maskImage: "linear-gradient(to right, transparent, black, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black, transparent)",
        }}
        animate={{
          x: ["100%", "-100%"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          ease: "linear",
        }}
      />
    </div>
  )
}

const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-300 animate-gradient ${className} section-gradient-text`}
    >
      {children}
    </span>
  )
}

export default function ReactToolsSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  // Track mouse position for parallax effects
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

  // Floating animation for dots
  const floatingDots = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <section ref={sectionRef} className="w-full bg-black text-white py-24 relative overflow-hidden section-wrapper">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-black section-background">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"
            style={{ animationDuration: "7s" }}
          />
          <div
            className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse"
            style={{ animationDuration: "10s" }}
          />
        </div>
      </div>

      {/* Animated floating dots */}
      {floatingDots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute w-1 h-1 bg-cyan-500 rounded-full section-dot"
          initial={{ x: `${dot.x}%`, y: `${dot.y}%`, opacity: 0.1 }}
          animate={{
            y: [`${dot.y}%`, `${dot.y - 10}%`, `${dot.y}%`],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: dot.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: dot.delay,
            ease: "easeInOut",
          }}
          style={{ width: dot.size, height: dot.size }}
        />
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10 section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center section-grid">
          <div className="space-y-6 section-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="section-heading-wrapper"
            >
              {/* Aceternity-inspired heading with mask reveal animation */}
              <div className="overflow-hidden">
                <motion.h2
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight section-heading"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                >
                  <ShimmerText>
                    <GradientText>React ecosystem</GradientText>
                  </ShimmerText>
                </motion.h2>
              </div>

              <div className="overflow-hidden mt-2">
                <motion.h2
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-100 section-heading"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                >
                  mastery
                </motion.h2>
              </div>
            </motion.div>

            <motion.p
              className="text-xl text-gray-400 max-w-xl section-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              From component architecture to production deployment, we build scalable React applications with modern
              tooling and performance-optimized code.
            </motion.p>

            <motion.div
              className="flex items-center space-x-4 pt-4 section-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <motion.div
                className="w-12 h-1 bg-cyan-500 section-line"
                whileHover={{ width: 60, transition: { duration: 0.3 } }}
              ></motion.div>
              <motion.span
                className="text-cyan-500 font-medium flex items-center group cursor-pointer section-link"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Explore our tools
                <motion.div
                  className="ml-2 h-4 w-4"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.span>
            </motion.div>
          </div>

          <motion.div
            className="relative section-image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              transform: `perspective(1000px) rotateY(${(mousePosition.x - (sectionRef.current?.offsetWidth || 0) / 2) / 50}deg) rotateX(${-(mousePosition.y - (sectionRef.current?.offsetHeight || 0) / 2) / 50}deg)`,
              transition: "transform 0.1s ease-out",
            }}
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

              <div className="relative bg-black p-1 rounded-xl overflow-hidden section-image-wrapper">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 section-image-overlay"></div>

                <Image
                  src="/react-component-visualization.png"
                  width={800}
                  height={600}
                  alt="React ecosystem visualization"
                  className="rounded-lg w-full h-auto relative z-10 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 section-image"
                  priority
                />

                <motion.div
                  className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-gray-800 z-20 section-badge"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -10px rgba(0, 230, 255, 0.3)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Component library</div>
                      <div className="text-lg font-medium">
                        <GradientText>120+ optimized elements</GradientText>
                      </div>
                    </div>
                    <motion.div
                      className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center cursor-pointer section-button"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(0, 230, 255, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight className="h-5 w-5 text-black" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
