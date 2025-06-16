"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Minimize, Maximize, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextGenerateEffect } from "@/components/chatbot/text-generate-effect"
import TeteRebotIcon from "@/components/chatbot/tete-rebot-icon"
import PriceForm from "@/components/chatbot/price-form"
import { useRouter } from "next/navigation"

// Types
type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  action?: "scroll" | "navigate" | "replace" | null
  target?: string
}

type BotMood = "neutral" | "curious" | "surprised" | "happy" | "sleepy"

// Configuration
type FloatingChatbotConfig = {
  useOpenAI?: boolean
  openAIApiKey?: string
  openAIModel?: string
  initialGreeting?: string
  suggestedQuestions?: Array<{ text: string; action: string }>
  locale?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  sections?: Record<string, string> // Map of keywords to section IDs
  pages?: Record<string, string> // Map of keywords to page routes
}

// Default configuration
const defaultConfig: FloatingChatbotConfig = {
  useOpenAI: false,
  openAIModel: "gpt-4o",
  initialGreeting: "Hello! I'm TeteRebot. How can I help you navigate the site?",
  suggestedQuestions: [
    { text: "Show me your features", action: "features" },
    { text: "Tell me about pricing", action: "pricing" },
    { text: "Go to about page", action: "about" },
  ],
  locale: "en",
  position: "bottom-right",
  sections: {
    features: "features-section",
    services: "services-section",
    testimonials: "testimonials-section",
    contact: "contact-section",
  },
  pages: {
    about: "/about",
    blog: "/blog",
    contact: "/contact",
  },
}

// Component to replace hero with price form
const PriceFormSection = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-300 via-white to-cyan-200 text-transparent bg-clip-text">
          Request Pricing Information
        </h2>
        <PriceForm onSubmit={onSubmit} />
      </div>
    </motion.div>
  )
}

export default function FloatingChatbot(props: Partial<FloatingChatbotConfig>) {
  // Merge provided config with defaults
  const config = { ...defaultConfig, ...props }

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [botMood, setBotMood] = useState<BotMood>("neutral")
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showPriceForm, setShowPriceForm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  }

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initial greeting when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        handleAssistantResponse(config.initialGreeting || defaultConfig.initialGreeting!, "curious")
      }, 500)
    }
  }, [isOpen, config.initialGreeting])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    setBotMood("curious")

    // Process the message and get a response
    if (config.useOpenAI) {
      processMessageWithOpenAI(input)
    } else {
      processMessageWithHardcodedResponses(input)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    setBotMood("curious")

    // Process the message and get a response
    if (config.useOpenAI) {
      processMessageWithOpenAI(question)
    } else {
      processMessageWithHardcodedResponses(question)
    }
  }

  // Process message with hardcoded responses
  const processMessageWithHardcodedResponses = (message: string) => {
    // Simulate API delay
    setTimeout(() => {
      const lowerMessage = message.toLowerCase()

      // Check for section scrolling
      for (const [keyword, sectionId] of Object.entries(config.sections || {})) {
        if (lowerMessage.includes(keyword)) {
          handleAssistantResponse(`I'll take you to the ${keyword} section right away.`, "happy", "scroll", sectionId)
          return
        }
      }

      // Check for page navigation
      for (const [keyword, route] of Object.entries(config.pages || {})) {
        if (lowerMessage.includes(keyword)) {
          handleAssistantResponse(`I'll take you to the ${keyword} page.`, "happy", "navigate", route)
          return
        }
      }

      // Check for pricing form
      if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("quote")) {
        handleAssistantResponse(
          "I'd be happy to provide pricing information. Please fill out this quick form:",
          "neutral",
          "replace",
          "price-form",
        )
        return
      }

      // Default responses
      if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
        handleAssistantResponse("Hello there! How can I help you navigate our site today?", "happy")
      } else if (lowerMessage.includes("thank")) {
        handleAssistantResponse("You're welcome! Is there anything else I can help you with?", "happy")
      } else {
        handleAssistantResponse(
          "I can help you navigate to different sections of our site. Would you like to see our features, pricing, or learn about our company?",
          "curious",
        )
      }
    }, 1000)
  }

  // Process message with OpenAI API
  const processMessageWithOpenAI = async (message: string) => {
    if (!config.openAIApiKey) {
      console.error("OpenAI API key is not provided")
      handleAssistantResponse("Sorry, I'm unable to process your request at the moment.", "surprised")
      return
    }

    try {
      // Determine action based on message content
      let action: "scroll" | "navigate" | "replace" | null = null
      let target: string | undefined = undefined

      const lowerMessage = message.toLowerCase()

      // Check for section scrolling
      for (const [keyword, sectionId] of Object.entries(config.sections || {})) {
        if (lowerMessage.includes(keyword)) {
          action = "scroll"
          target = sectionId
          break
        }
      }

      // Check for page navigation
      if (!action) {
        for (const [keyword, route] of Object.entries(config.pages || {})) {
          if (lowerMessage.includes(keyword)) {
            action = "navigate"
            target = route
            break
          }
        }
      }

      // Check for pricing form
      if (
        !action &&
        (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("quote"))
      ) {
        action = "replace"
        target = "price-form"
      }

      // Call OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.openAIApiKey}`,
        },
        body: JSON.stringify({
          model: config.openAIModel,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful navigation assistant for a website. Keep responses concise and focused on helping users find what they need.",
            },
            { role: "user", content: message },
          ],
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`)
      }

      const data = await response.json()
      const botResponse = data.choices[0].message.content

      // Determine bot mood based on response content
      let mood: BotMood = "neutral"
      if (botResponse.includes("sorry") || botResponse.includes("apologize")) {
        mood = "surprised"
      } else if (botResponse.includes("thank") || botResponse.includes("happy") || botResponse.includes("great")) {
        mood = "happy"
      } else if (botResponse.includes("?")) {
        mood = "curious"
      }

      handleAssistantResponse(botResponse, mood, action, target)
    } catch (error) {
      console.error("Error calling OpenAI API:", error)
      handleAssistantResponse("Sorry, I encountered an error processing your request.", "surprised")
    }
  }

  const handleAssistantResponse = (
    content: string,
    mood: BotMood,
    action: "scroll" | "navigate" | "replace" | null = null,
    target?: string,
  ) => {
    setBotMood(mood)
    setIsTyping(false)

    const assistantMessage: Message = {
      id: Date.now().toString(),
      content: content,
      role: "assistant",
      action: action,
      target: target,
    }

    setMessages((prev) => [...prev, assistantMessage])

    // Execute the action after a short delay to allow the message to be read
    if (action && target) {
      setTimeout(() => {
        executeAction(action, target)
      }, 1500)
    }
  }

  const executeAction = (action: "scroll" | "navigate" | "replace", target: string) => {
    switch (action) {
      case "scroll":
        // Scroll to section
        const element = document.getElementById(target)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        } else {
          console.error(`Section with ID "${target}" not found`)
        }
        break

      case "navigate":
        // Navigate to page
        router.push(target)
        break

      case "replace":
        // Replace hero with form
        if (target === "price-form") {
          setShowPriceForm(true)
          // Hide the price form after form submission (handled in handlePriceFormSubmit)
        }
        break
    }
  }

  const handlePriceFormSubmit = (data: any) => {
    handleAssistantResponse(
      `Thank you for your inquiry! Based on your needs (${data.service} for ${data.company}), we'll prepare a custom quote and contact you at ${data.email} within 24 hours.`,
      "happy",
    )

    // Hide the price form after a delay
    setTimeout(() => {
      setShowPriceForm(false)
    }, 5000)
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Price Form Overlay - Only shown when needed */}
      {showPriceForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto bg-charcoal rounded-xl border border-cyan-500/20 shadow-xl">
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPriceForm(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <PriceFormSection onSubmit={handlePriceFormSubmit} />
          </div>
        </div>
      )}

      {/* Floating Chatbot */}
      <div className={`fixed ${positionClasses[config.position || "bottom-right"]} z-50`}>
        {/* Chat Button */}
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
            onClick={toggleChatbot}
          >
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-charcoal border border-cyan-500/30 rounded-xl shadow-xl overflow-hidden flex flex-col"
            style={{ width: "350px", maxHeight: "500px" }}
          >
            {/* Chat Header */}
            <div className="bg-black/30 p-3 flex items-center justify-between border-b border-cyan-500/20">
              <div className="flex items-center space-x-2">
                <div className="relative h-8 w-8">
                  <TeteRebotIcon size={32} alive={true} mood={botMood} color="#06b6d4" />
                </div>
                <span className="font-medium text-white">TeteRebot Assistant</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMinimize}
                  className="h-7 w-7 text-white/70 hover:text-white"
                >
                  {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChatbot}
                  className="h-7 w-7 text-white/70 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Body - Collapsible */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4"
                  style={{ maxHeight: "350px" }}
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-cyan-600 text-white"
                            : "bg-black/20 border border-cyan-500/20 text-white"
                        }`}
                      >
                        <TextGenerateEffect words={message.content} className="text-sm" />
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-black/20 border border-cyan-500/20 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div
                            className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Input */}
            {!isMinimized && (
              <div className="p-3 border-t border-cyan-500/20 bg-black/20">
                <div className="mb-2 flex flex-wrap gap-1">
                  {config.suggestedQuestions?.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question.text)}
                      className="text-xs bg-black/30 hover:bg-cyan-900/30 text-cyan-300 rounded-full px-2 py-1 transition-colors"
                    >
                      {question.text}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-black/30 border-none text-white text-sm h-9"
                  />
                  <Button
                    type="submit"
                    disabled={isTyping}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-cyan-400 hover:text-cyan-300 hover:bg-black/20"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </>
  )
}
