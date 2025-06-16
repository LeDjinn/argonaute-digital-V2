"use client"

import { useEffect, useState } from "react"

export const TextGenerateEffect = ({ words, className = "" }: { words: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + words[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 30) // Slowed down typing speed

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, words])

  // Reset when words change
  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [words])

  return <div className={className}>{displayedText}</div>
}
