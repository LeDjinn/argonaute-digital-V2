// @ts-nocheck
"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Server, Database, Lock, Cpu } from "lucide-react"
import { motion } from "framer-motion"

// Aceternity-inspired text components
const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-300 animate-gradient ${className} section-gradient-text`}
    >
      {children}
    </span>
  )
}

const SplitText = ({ children, className = "" }: { children: string; className?: string }) => {
  return (
    <div className={`${className} section-split-text`}>
      {children.split(" ").map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: wordIndex * 0.1 + 0.1 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

export default function NodejsToolsSection() {
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

  // Features with icons
  const features = [
    {
      icon: <Server className="h-5 w-5 text-cyan-400" />,
      title: "High Performance",
      description: "Non-blocking I/O model for efficient operations",
    },
    {
      icon: <Database className="h-5 w-5 text-cyan-400" />,
      title: "Data Streaming",
      description: "Process data in chunks without buffering",
    },
    {
      icon: <Lock className="h-5 w-5 text-cyan-400" />,
      title: "Secure Defaults",
      description: "Built-in security features and best practices",
    },
    {
      icon: <Cpu className="h-5 w-5 text-cyan-400" />,
      title: "Microservices",
      description: "Perfect for building scalable microservice architectures",
    },
  ]

  return (
    <section ref={sectionRef} className="w-full bg-black text-white py-24 relative overflow-hidden section-wrapper">
      {/* Background elements */}
      <div className="absolute inset-0 section-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-700/50 to-transparent"></div>
      </div>

      {/* Animated dots */}
      {Array.from({ length: 30 }).map((_, i) => (
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
          {/* Content on the left */}
          <div className="space-y-8 section-content">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="section-heading-wrapper"
              >
                {/* Aceternity-inspired heading */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight section-heading">
                  <GradientText>Node.js</GradientText>
                  <span className="relative ml-2">
                    <span className="relative z-10">backend</span>
                    <motion.span
                      className="absolute -bottom-2 left-0 h-3 bg-cyan-500/30 w-full section-underline"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </span>
                </h2>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <SplitText className="text-xl text-gray-400 max-w-xl section-description">
                Scalable server-side JavaScript runtime for building high-performance network applications
              </SplitText>
            </motion.div>

            {/* Features list */}
            <div className="space-y-4 section-features">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg hover:bg-cyan-950/30 transition-colors duration-300 section-feature"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
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
                    src="/nodejs-server-architecture.png"
                    width={800}
                    height={600}
                    alt="Node.js server architecture"
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
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-green-500">v20 LTS</span>
                </motion.div>

                {/* Code snippet */}
                <motion.div
                  className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-sm p-3 rounded-lg border border-gray-800 z-20 section-badge"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -10px rgba(0, 230, 255, 0.3)",
                  }}
                >
                  <div className="font-mono text-xs text-gray-300">
                    <div className="text-cyan-400">const server = http.createServer();</div>
                    <div>server.listen(3000, () =&gt; {`{`}</div>
                    <div className="pl-2 text-green-400">console.log('Running');</div>
                    <div>{`}`});</div>
                  </div>
                </motion.div>

                {/* Stats badge */}
                <motion.div
                  className="absolute top-6 left-6 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-gray-800 z-20 section-badge"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="text-xs text-gray-400">Requests/sec</div>
                  <div className="text-sm font-medium text-cyan-400">50,000+</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
