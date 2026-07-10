// @ts-nocheck
"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import clientLogosContent from "./locales/client-logos.json"

// Types
type Locale = "en" | "fr"
type TrustIndicator = {
  icon: string
  text: string
}
type Client = {
  id: number
  name: string
  image: string
}
type ClientLogosContent = {
  title: string
  subtitle: string
  description: string
  trustIndicators: TrustIndicator[]
  clients: Client[]
}

export const ClientLogosSection = ({ locale = "en" }: { locale?: Locale }) => {
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Get content based on locale
  const content: ClientLogosContent =
    (clientLogosContent as Record<Locale, ClientLogosContent>)[locale] || clientLogosContent.en

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [])

  // Duplicate logos to create the infinite effect
  const duplicatedLogos = [...content.clients, ...content.clients, ...content.clients]

  // Get icon for trust indicator
  const getTrustIcon = (iconName: string) => {
    switch (iconName) {
      case "check":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#06B0D4]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "clock":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#06B0D4]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "zap":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#06B0D4]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#06B0D4]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
    }
  }

  return (
    <section className="w-full bg-black text-white py-24 relative overflow-hidden section-wrapper">
      {/* Background elements */}
      <div className="absolute inset-0 section-background">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#06B0D4]/5 to-black opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#06B0D4]/30 to-transparent"></div>
      </div>

      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#06B0D4] rounded-full section-particle"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 10}%`, `${Math.random() * 100}%`],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
          }}
        />
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10 section-container">
        <div className="text-center mb-16 section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="section-heading-wrapper"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 section-heading">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#06B0D4] to-[#06B0D4]/70 animate-gradient">
                {content.title}
              </span>{" "}
              {content.subtitle}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto section-description">{content.description}</p>
          </motion.div>
        </div>

        {/* Infinite carousel */}
        <div className="relative overflow-hidden section-carousel-container">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent"></div>

          <motion.div
            ref={carouselRef}
            className="cursor-grab overflow-hidden section-carousel"
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div
              className="flex items-center"
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              initial={{ x: 0 }}
              animate={{
                x: [-width / 2, 0],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 50,
                  ease: "linear",
                },
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <motion.div
                  key={`${logo.id}-${index}`}
                  className="min-w-[250px] h-32 flex items-center justify-center mx-8 px-8 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-[#06B0D4]/50 transition-all duration-300 section-logo-card"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -10px rgba(6, 176, 212, 0.2)",
                  }}
                >
                  <Image
                    src={logo.image || "/placeholder.svg"}
                    alt={logo.name}
                    width={180}
                    height={80}
                    className="max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-500 section-logo"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 section-trust-indicators">
          {content.trustIndicators.map((indicator, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2 text-gray-400 section-trust-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div className="h-10 w-10 rounded-full bg-[#06B0D4]/10 flex items-center justify-center">
                {getTrustIcon(indicator.icon)}
              </div>
              <span>{indicator.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientLogosSection
