"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TeteRebotIconProps {
  size?: number // width/height in pixels
  className?: string // e.g. 'text-red-500' for overriding default fill
  alive?: boolean // whether the robot should animate automatically
  mood?: "neutral" | "curious" | "surprised" | "happy" | "sleepy" // specific mood to display
  color?: string // custom color for the robot (hex, rgb, etc.)
}

const TeteRebotIcon: React.FC<TeteRebotIconProps> = ({
  size = 100,
  className = "",
  alive = true,
  mood,
  color = "#2E94BC", // Default color
}) => {
  // Map mood string to expression state number
  const moodToState = {
    neutral: 0,
    curious: 1,
    surprised: 2,
    happy: 3,
    sleepy: 4,
  }

  // State for expressions
  const [expressionState, setExpressionState] = useState(mood ? moodToState[mood] : 0)

  // Change expressions randomly if alive and no specific mood set
  useEffect(() => {
    if (!alive || mood !== undefined) return

    const interval = setInterval(() => {
      setExpressionState(Math.floor(Math.random() * 5)) // 0-4 different expressions
    }, 4000) // Change expression every 4 seconds

    return () => clearInterval(interval)
  }, [alive, mood])

  // Update expression when mood prop changes
  useEffect(() => {
    if (mood !== undefined) {
      setExpressionState(moodToState[mood])
    }
  }, [mood])

  // Generate a lighter shade of the color for animation
  const lighterColor = () => {
    // For hex colors
    if (color.startsWith("#")) {
      let r = Number.parseInt(color.slice(1, 3), 16)
      let g = Number.parseInt(color.slice(3, 5), 16)
      let b = Number.parseInt(color.slice(5, 7), 16)

      // Lighten by 15%
      r = Math.min(255, r + 38)
      g = Math.min(255, g + 38)
      b = Math.min(255, b + 38)

      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
    }

    // For other color formats, return a slightly lighter blue
    return "#3AABCF"
  }

  // Animation variants
  const svgVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  }

  const floatVariants = {
    animate: {
      y: alive ? [0, -8, 0] : 0,
      transition: {
        duration: 4,
        repeat: alive ? Number.POSITIVE_INFINITY : 0,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: alive ? [1, 1.03, 1] : 1,
      transition: {
        duration: 3,
        repeat: alive ? Number.POSITIVE_INFINITY : 0,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  }

  // Eye expressions based on state
  const getLeftEyeVariants = () => {
    switch (expressionState) {
      case 0: // Normal blinking
        return {
          animate: {
            scaleY: alive ? [1, 0.1, 1] : 1,
            rx: 35,
            ry: 35,
            transition: {
              duration: 0.4,
              repeat: alive ? Number.POSITIVE_INFINITY : 0,
              repeatDelay: Math.random() * 5 + 2,
              ease: "easeInOut",
            },
          },
        }
      case 1: // Looking around (shift position)
        return {
          animate: {
            x: alive ? [-20, 0, 20, 0] : 0,
            y: alive ? [-20, 0, 20, 0] : 0,
            rx: 35,
            ry: 35,
            transition: {
              duration: 3,
              repeat: alive ? Number.POSITIVE_INFINITY : 0,
              repeatType: "loop" as const,
              ease: "easeInOut",
            },
          },
        }
      case 2: // Surprised (bigger eyes)
        return {
          animate: {
            rx: 45,
            ry: 45,
            scale: 1.2,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
        }
      case 3: // Happy (squinted eyes)
        return {
          animate: {
            scaleY: 0.5,
            y: -10,
            rx: 20,
            ry: 10,
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          },
        }
      case 4: // Sleepy (half-closed eyes)
        return {
          animate: {
            scaleY: 0.3,
            y: 10,
            rx: 35,
            ry: 10,
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          },
        }
      default:
        return {
          animate: {
            scale: 1,
            rx: 35,
            ry: 35,
            transition: { duration: 0.5 },
          },
        }
    }
  }

  const getRightEyeVariants = () => {
    switch (expressionState) {
      case 0: // Normal blinking
        return {
          animate: {
            scaleY: alive ? [1, 0.1, 1] : 1,
            rx: 35,
            ry: 35,
            transition: {
              duration: 0.4,
              repeat: alive ? Number.POSITIVE_INFINITY : 0,
              repeatDelay: Math.random() * 5 + 2.5, // Slightly different timing than left eye
              ease: "easeInOut",
              delay: 0.2, // Slight delay for natural feel
            },
          },
        }
      case 1: // Looking around (shift position)
        return {
          animate: {
            x: alive ? [-20, 0, 20, 0] : 0,
            y: alive ? [-20, 0, 20, 0] : 0,
            rx: 35,
            ry: 35,
            transition: {
              duration: 3,
              repeat: alive ? Number.POSITIVE_INFINITY : 0,
              repeatType: "loop" as const,
              ease: "easeInOut",
              delay: 0.2, // Slight delay for natural feel
            },
          },
        }
      case 2: // Surprised (bigger eyes)
        return {
          animate: {
            rx: 45,
            ry: 45,
            scale: 1.2,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
        }
      case 3: // Happy (squinted eyes)
        return {
          animate: {
            scaleY: 0.5,
            y: -10,
            rx: 20,
            ry: 10,
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          },
        }
      case 4: // Sleepy (half-closed eyes)
        return {
          animate: {
            scaleY: 0.3,
            y: 10,
            rx: 35,
            ry: 10,
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          },
        }
      default:
        return {
          animate: {
            scale: 1,
            rx: 35,
            ry: 35,
            transition: { duration: 0.5 },
          },
        }
    }
  }

  // Mouth expressions based on state
  const getMouthExpression = () => {
    switch (expressionState) {
      case 0: // Neutral
        return (
          <motion.path
            d="M950,1350 Q1000,1380 1050,1350"
            stroke="#1A5B75"
            strokeWidth="15"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )
      case 1: // Curious
        return (
          <motion.path
            d="M950,1350 Q1000,1330 1050,1350"
            stroke="#1A5B75"
            strokeWidth="15"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )
      case 2: // Surprised
        return (
          <motion.ellipse
            cx="1000"
            cy="1350"
            rx="30"
            ry="40"
            fill="#1A5B75"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          />
        )
      case 3: // Happy
        return (
          <motion.path
            d="M950,1350 Q1000,1400 1050,1350"
            stroke="#1A5B75"
            strokeWidth="15"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )
      case 4: // Sleepy
        return (
          <motion.path
            d="M950,1360 L1050,1360"
            stroke="#1A5B75"
            strokeWidth="15"
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )
      default:
        return null
    }
  }

  // Eyebrow expressions based on state
  const getEyebrowExpression = (isLeft: boolean) => {
    const baseX = isLeft ? 679.4 : 1321.7
    const xOffset = isLeft ? -40 : 40

    switch (expressionState) {
      case 1: // Curious
        return (
          <motion.path
            d={`M${baseX - 50},1130 Q${baseX},1110 ${baseX + 50},1130`}
            stroke="#1A5B75"
            strokeWidth="12"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )
      case 2: // Surprised
        return (
          <motion.path
            d={`M${baseX - 50},1110 Q${baseX},1090 ${baseX + 50},1110`}
            stroke="#1A5B75"
            strokeWidth="12"
            fill="none"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          />
        )
      case 3: // Happy
        return (
          <motion.path
            d={`M${baseX - 50},1130 Q${baseX},1110 ${baseX + 50},1130`}
            stroke="#1A5B75"
            strokeWidth="12"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )
      case 4: // Sleepy
        return (
          <motion.path
            d={`M${baseX - 50},1150 Q${baseX},1170 ${baseX + 50},1150`}
            stroke="#1A5B75"
            strokeWidth="12"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )
      default:
        return null
    }
  }

  // Get color for emotion indicator
  const getEmotionColor = () => {
    switch (expressionState) {
      case 0:
        return "#4ADBFF" // Neutral - blue
      case 1:
        return "#FFD700" // Curious - gold
      case 2:
        return "#FF5733" // Surprised - orange-red
      case 3:
        return "#4AFF5E" // Happy - green
      case 4:
        return "#9B59B6" // Sleepy - purple
      default:
        return "#4ADBFF"
    }
  }

  return (
    <motion.svg
      width={size}
      height={(size * 1784) / 2000}
      viewBox="0 0 2000 1784"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={svgVariants}
      initial="initial"
      animate="animate"
    >
      <motion.g variants={floatVariants} animate="animate">
        <motion.g variants={pulseVariants} animate="animate">
          <motion.path
            fill={color}
            variants={pathVariants}
            d="M135.3,925.3L67.5,939C28.3,946.8,0,981.3,0,1021.4v228.3c0,40,28.2,74.5,67.5,82.4l67.8,13.7
              c15.6,3.1,30.2-8.8,30.2-24.7V950C165.4,934.1,150.9,922.1,135.3,925.3z"
            animate={{
              fill: alive ? [color, lighterColor(), color] : color,
              transition: {
                duration: 5,
                repeat: alive ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse" as const,
                ease: "easeInOut",
              },
            }}
          />
          <motion.path
            fill={color}
            variants={pathVariants}
            d="M1497.6,589.5c-143.5-53.1-293.6-82.5-444.3-88V384c78.3-23.1,135.6-95.5,135.6-181.2
              c0-104.1-84.7-188.9-188.9-188.9c-104.1,0-188.9,84.7-188.9,188.9c0,85.6,57.3,158.1,135.6,181.2v117.5
              c-150.7,5.6-300.8,34.9-444.3,88C325.7,654.9,207,826.3,207,1015.9v364.3c0,99.9,55.5,190.2,144.9,235.5
              C554.8,1718.6,777.4,1770,1000,1770s445.2-51.4,648.1-154.3c89.4-45.3,145-135.6,145-235.5v-364.3
              C1793.1,826.3,1674.3,654.9,1497.6,589.5z M864.4,202.8c0-74.9,60.7-135.6,135.5-135.6c74.9,0,135.6,60.7,135.6,135.6
              s-60.7,135.5-135.6,135.5C925.1,338.4,864.4,277.7,864.4,202.8z M999.8,607h0.4c128.4,0,256.7,18.7,380.9,55.9l-50.5,197.6
              c-0.2,1-0.4,1.9-0.6,2.9c-168.8-30.2-330.1-31.5-330.1-31.5s-161.3,1.3-330.1,31.5c-0.2-1-0.3-1.9-0.6-2.9L625,687l-6.1-24.1
              C743.1,625.7,871.4,607.1,999.8,607z M1448.9,1213.3c0,70.3-57,127.2-127.2,127.2c-70.3,0-127.2-57-127.2-127.2
              c0-70.3,57-127.2,127.2-127.2C1391.9,1086.1,1448.9,1143.1,1448.9,1213.3z M679.4,1086.1c70.2,0,127.1,56.9,127.1,127.1
              s-56.9,127.1-127.1,127.1s-127.1-56.9-127.1-127.1C552.3,1143,609.2,1086.1,679.4,1086.1z M1686.4,1380.2
              c0,59.5-33.2,113.4-86.5,140.4c-375.6,190.4-824.2,190.4-1199.8,0c-53.4-27.1-86.5-80.9-86.5-140.4v-364.3
              c0-137.4,81.2-262.2,204.3-317.6L565.8,886c-47.1,12.3-92.3,27.4-131.9,46c-29.6,13.9-48.6,43.4-48.6,76.1v369.8
              c0,29.1,15,56.3,39.9,71.4c79.5,48.4,276.1,145.5,574.7,145.5s495.2-97,574.7-145.5c24.9-15.1,39.9-42.3,39.9-71.4v-369.8
              c0-32.7-19-62.2-48.6-76.1c-39.6-18.6-84.8-33.7-131.9-46l47.9-187.7c123.1,55.4,204.3,180.2,204.3,317.6v364.3H1686.4z"
            animate={{
              fill: alive ? [color, lighterColor(), color] : color,
              transition: {
                duration: 5,
                repeat: alive ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse" as const,
                ease: "easeInOut",
              },
            }}
          />
          <motion.path
            fill={color}
            variants={pathVariants}
            d="M1932.5,938.9l-67.8-13.7c-15.6-3.1-30.2,8.8-30.2,24.7v371c0,15.9,14.6,27.8,30.2,24.7l67.8-13.7
              c39.2-7.9,67.5-42.4,67.5-82.4v-228.3C2000,981.3,1971.7,946.8,1932.5,938.9z"
            animate={{
              fill: alive ? [color, lighterColor(), color] : color,
              transition: {
                duration: 5,
                repeat: alive ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse" as const,
                ease: "easeInOut",
              },
            }}
          />

          {/* Left eye - black hole */}
          <motion.ellipse
            cx="679.4"
            cy="1213.3"
            rx="35"
            ry="35"
            fill={alive ? getEmotionColor() : "#555555"}
            variants={getLeftEyeVariants()}
            animate="animate"
          />

          {/* Right eye - black hole */}
          <motion.ellipse
            cx="1321.7"
            cy="1213.3"
            rx="35"
            ry="35"
            fill={alive ? getEmotionColor() : "#555555"}
            variants={getRightEyeVariants()}
            animate="animate"
          />

          {/* Left eyebrow */}
          {getEyebrowExpression(true)}

          {/* Right eyebrow */}
          {getEyebrowExpression(false)}

          {/* Mouth */}
          {getMouthExpression()}

          {/* Continuous glowing effect */}
          {alive && (
            <motion.circle
              cx="1000"
              cy="900"
              r="400"
              animate={{
                opacity: [0, 0.1, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              fill={color}
            />
          )}

          {/* Antenna with emotion indicator light */}
          <g>
            {/* Antenna stem */}
            <motion.rect
              x="995"
              y="450"
              width="10"
              height="50"
              rx="5"
              fill={color}
              animate={{
                fill: alive ? [color, lighterColor(), color] : color,
              }}
              transition={{
                duration: 3,
                repeat: alive ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse" as const,
              }}
            />

            {/* Antenna light */}
            <motion.circle
              cx="1000"
              cy="200"
              r="60"
              fill={alive ? getEmotionColor() : "#555555"}
              animate={{
                fill: alive ? [getEmotionColor(), lighterColor(), getEmotionColor()] : "#555555",
                scale: alive ? [1, 1.2, 1] : 1,
                opacity: alive ? 1 : 0.7,
              }}
              transition={{
                duration: 1.5,
                repeat: alive ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse" as const,
              }}
            />

            {/* Light glow effect */}
            {alive && (
              <motion.circle
                cx="1000"
                cy="430"
                r="25"
                fill="transparent"
                stroke={getEmotionColor()}
                strokeWidth="2"
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            )}
          </g>

          {/* Top face hole with colored dot */}
          <g>
            {/* Outer circle (hole) */}
            <circle cx="1000" cy="500" r="20" fill="black" />

            {/* Inner colored dot */}
            <motion.circle
              cx="1000"
              cy="500"
              r="12"
              fill={alive ? getEmotionColor() : "#555555"}
              animate={{
                fill: alive ? [getEmotionColor(), lighterColor(), getEmotionColor()] : "#555555",
                scale: alive ? [1, 1.15, 1] : 1,
                opacity: alive ? 1 : 0.7,
              }}
              transition={{
                duration: 1.8,
                repeat: alive ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse" as const,
                delay: 0.3, // Slight delay for coordinated but not identical animation with antenna
              }}
            />

            {/* Inner glow effect */}
            {alive && (
              <motion.circle
                cx="1000"
                cy="500"
                r="8"
                fill="transparent"
                stroke={getEmotionColor()}
                strokeWidth="2"
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.5,
                }}
              />
            )}
          </g>
        </motion.g>
      </motion.g>
    </motion.svg>
  )
}

export default TeteRebotIcon
