// @ts-nocheck
"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextGenerateEffect } from "./text-generate-effect";
import TeteRebotIcon from "./tete-rebot-icon";
import { SparklesCore } from "./sparkles";
import PriceForm from "./price-form";
import { useRouter } from "next/navigation";
import type { CompactChatbotConfig, Message, BotMood } from "./types";

// Default configuration
const defaultConfig: CompactChatbotConfig = {
  useOpenAI: false,
  openAIModel: "gpt-4o",
  initialGreeting: "Hello! How can I help you today?",
  suggestedQuestions: [
    { text: "Show me your features", action: "features" },
    { text: "Tell me about pricing", action: "pricing" },
    { text: "Go to about page", action: "about" },
  ],
  locale: "en",
  position: "top-right",
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
  actions: {
    pricing: {
      type: "replace",
      target: "price-form",
      response:
        "I'd be happy to provide pricing information. Please fill out this quick form:",
    },
  },
  systemPrompt:
    "You are a helpful navigation assistant for a website. Keep responses concise and focused on helping users find what they need.",
  theme: {
    primaryColor: "#06b6d4", // Cyan-500
    backgroundColor: "#08090A", // Charcoal
    textColor: "#FFFFFF", // White
    botColor: "#06b6d4", // Cyan-500
  },
};

// Component to display the price form
const PriceFormOverlay = ({
  onSubmit,
  onClose,
}: {
  onSubmit: (data: any) => void;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-charcoal rounded-xl border border-cyan-500/20 shadow-xl">
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            Close
          </Button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-300 via-white to-cyan-200 text-transparent bg-clip-text">
            Request Pricing Information
          </h2>
          <PriceForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default function CompactChatbot(props: Partial<CompactChatbotConfig>) {
  // Merge provided config with defaults
  const config = { ...defaultConfig, ...props };

  // Extract theme colors
  const { primaryColor, backgroundColor, textColor, botColor } =
    config.theme || defaultConfig.theme || {};

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [botMood, setBotMood] = useState<BotMood>("neutral");
  const [showPriceForm, setShowPriceForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Position classes
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    setTimeout(() => {
      handleAssistantResponse(
        config.initialGreeting || defaultConfig.initialGreeting!,
        "curious"
      );
    }, 500);
  }, [config.initialGreeting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setBotMood("curious");

    // Process the message and get a response
    if (config.useOpenAI && config.openAIApiKey) {
      processMessageWithOpenAI(input);
    } else {
      processMessageWithHardcodedResponses(input);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setBotMood("curious");

    // Process the message and get a response
    if (config.useOpenAI && config.openAIApiKey) {
      processMessageWithOpenAI(question);
    } else {
      processMessageWithHardcodedResponses(question);
    }
  };

  // Process message with hardcoded responses
  const processMessageWithHardcodedResponses = (message: string) => {
    // Simulate API delay
    setTimeout(() => {
      const lowerMessage = message.toLowerCase();

      // Check for custom actions first
      if (config.actions) {
        for (const [keyword, actionConfig] of Object.entries(config.actions)) {
          if (lowerMessage.includes(keyword)) {
            handleAssistantResponse(
              actionConfig.response,
              "neutral",
              actionConfig.type,
              actionConfig.target
            );
            return;
          }
        }
      }

      // Check for section scrolling
      if (config.sections) {
        for (const [keyword, sectionId] of Object.entries(config.sections)) {
          if (lowerMessage.includes(keyword)) {
            handleAssistantResponse(
              `I'll take you to the ${keyword} section right away.`,
              "happy",
              "scroll",
              sectionId
            );
            return;
          }
        }
      }

      // Check for page navigation
      if (config.pages) {
        for (const [keyword, route] of Object.entries(config.pages)) {
          if (lowerMessage.includes(keyword)) {
            handleAssistantResponse(
              `I'll take you to the ${keyword} page.`,
              "happy",
              "navigate",
              route
            );
            return;
          }
        }
      }

      // Check for pricing form (default behavior if not in custom actions)
      if (
        !config.actions?.pricing &&
        (lowerMessage.includes("price") ||
          lowerMessage.includes("cost") ||
          lowerMessage.includes("quote"))
      ) {
        handleAssistantResponse(
          "I'd be happy to provide pricing information. Please fill out this quick form:",
          "neutral",
          "replace",
          "price-form"
        );
        return;
      }

      // Default responses
      if (
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi") ||
        lowerMessage.includes("hey")
      ) {
        handleAssistantResponse(
          "Hello there! How can I help you navigate our site today?",
          "happy"
        );
      } else if (lowerMessage.includes("thank")) {
        handleAssistantResponse(
          "You're welcome! Is there anything else I can help you with?",
          "happy"
        );
      } else {
        handleAssistantResponse(
          "I can help you navigate to different sections of our site. Would you like to see our features, pricing, or learn about our company?",
          "curious"
        );
      }
    }, 1000);
  };

  // Process message with OpenAI API
  const processMessageWithOpenAI = async (message: string) => {
    if (!config.openAIApiKey) {
      console.error("OpenAI API key is not provided");
      handleAssistantResponse(
        "Sorry, I'm unable to process your request at the moment.",
        "surprised"
      );
      return;
    }

    try {
      // Determine action based on message content
      let action: "scroll" | "navigate" | "replace" | null = null;
      let target: string | undefined = undefined;

      const lowerMessage = message.toLowerCase();

      // Check for custom actions first
      if (config.actions) {
        for (const [keyword, actionConfig] of Object.entries(config.actions)) {
          if (lowerMessage.includes(keyword)) {
            action = actionConfig.type;
            target = actionConfig.target;
            break;
          }
        }
      }

      // Check for section scrolling if no action found
      if (!action && config.sections) {
        for (const [keyword, sectionId] of Object.entries(config.sections)) {
          if (lowerMessage.includes(keyword)) {
            action = "scroll";
            target = sectionId;
            break;
          }
        }
      }

      // Check for page navigation if no action found
      if (!action && config.pages) {
        for (const [keyword, route] of Object.entries(config.pages)) {
          if (lowerMessage.includes(keyword)) {
            action = "navigate";
            target = route;
            break;
          }
        }
      }

      // Check for pricing form if no action found
      if (
        !action &&
        (lowerMessage.includes("price") ||
          lowerMessage.includes("cost") ||
          lowerMessage.includes("quote"))
      ) {
        action = "replace";
        target = "price-form";
      }

      // Call OpenAI API
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.openAIApiKey}`,
          },
          body: JSON.stringify({
            model: config.openAIModel || defaultConfig.openAIModel,
            messages: [
              {
                role: "system",
                content: config.systemPrompt || defaultConfig.systemPrompt,
              },
              { role: "user", content: message },
            ],
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      // Determine bot mood based on response content
      let mood: BotMood = "neutral";
      if (botResponse.includes("sorry") || botResponse.includes("apologize")) {
        mood = "surprised";
      } else if (
        botResponse.includes("thank") ||
        botResponse.includes("happy") ||
        botResponse.includes("great")
      ) {
        mood = "happy";
      } else if (botResponse.includes("?")) {
        mood = "curious";
      }

      handleAssistantResponse(botResponse, mood, action, target);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      handleAssistantResponse(
        "Sorry, I encountered an error processing your request.",
        "surprised"
      );
    }
  };

  const handleAssistantResponse = (
    content: string,
    mood: BotMood,
    action: "scroll" | "navigate" | "replace" | null = null,
    target?: string
  ) => {
    setBotMood(mood);
    setIsTyping(false);

    const assistantMessage: Message = {
      id: Date.now().toString(),
      content: content,
      role: "assistant",
      action: action,
      target: target,
    };

    setMessages((prev) => [...prev, assistantMessage]);

    // Execute the action after a short delay to allow the message to be read
    if (action && target) {
      setTimeout(() => {
        executeAction(action, target);
      }, 1000);
    }
  };

  const executeAction = (
    action: "scroll" | "navigate" | "replace",
    target: string
  ) => {
    switch (action) {
      case "scroll":
        // Scroll to section
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          console.error(`Section with ID "${target}" not found`);
        }
        break;

      case "navigate":
        // Navigate to page
        router.push(target);
        break;

      case "replace":
        // Show price form
        if (target === "price-form") {
          console.log("Showing price form");
          setShowPriceForm(true);
        }
        break;
    }
  };

  const handlePriceFormSubmit = (data: any) => {
    setShowPriceForm(false);
    handleAssistantResponse(
      `Thank you for your inquiry! Based on your needs (${data.service} for ${data.company}), we'll prepare a custom quote and contact you at ${data.email} within 24 hours.`,
      "happy"
    );
  };

  // Generate dynamic styles based on theme
  const dynamicStyles = {
    backgroundColor: backgroundColor || "#08090A",
    borderColor: `${primaryColor || "#06b6d4"}4D`, // 30% opacity
    color: textColor || "#FFFFFF",
  };

  const userMessageStyles = {
    backgroundColor: primaryColor || "#06b6d4",
    color: "#FFFFFF",
  };

  const assistantMessageStyles = {
    backgroundColor: `${backgroundColor || "#08090A"}CC`, // 80% opacity
    borderColor: `${primaryColor || "#06b6d4"}33`, // 20% opacity
    color: textColor || "#FFFFFF",
  };

  const suggestedButtonStyles = {
    backgroundColor: `${backgroundColor || "#08090A"}CC`, // 80% opacity
    color: primaryColor || "#06b6d4",
    borderColor: "transparent",
    hoverBackgroundColor: `${primaryColor || "#06b6d4"}1A`, // 10% opacity
  };

  return (
    <>
      {/* Price Form Overlay */}
      {showPriceForm && (
        <PriceFormOverlay
          onSubmit={handlePriceFormSubmit}
          onClose={() => setShowPriceForm(false)}
        />
      )}

      {/* Compact Chatbot */}
      <div
        className={`fixed ${
          positionClasses[config.position || "top-right"]
        } z-40`}
      >
        <div
          className="rounded-xl shadow-xl overflow-hidden flex flex-col w-80"
          style={dynamicStyles}
        >
          {/* Robot Avatar */}
          <div
            className="flex justify-center py-3 border-b"
            style={{
              borderColor: dynamicStyles.borderColor,
              backgroundColor: `${backgroundColor || "#08090A"}CC`,
            }}
          >
            <div className="relative h-[70px] w-[70px]">
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <SparklesCore
                  id="chatbot-sparkles"
                  background="transparent"
                  particleSize={1}
                  particleDensity={40}
                  particleColor={botColor || "#06b6d4"}
                  className="w-full h-full"
                />
              </div>
              <div className="relative z-10">
                <TeteRebotIcon
                  size={60}
                  alive={true}
                  mood={botMood}
                  color={botColor || "#06b6d4"}
                />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-3 flex flex-col space-y-3"
            style={{ maxHeight: "150px" }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-2 ${
                    message.role === "user" ? "border-0" : "border"
                  }`}
                  style={
                    message.role === "user"
                      ? userMessageStyles
                      : assistantMessageStyles
                  }
                >
                  <TextGenerateEffect
                    words={message.content}
                    className="text-xs"
                  />
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="rounded-lg p-2 border"
                  style={assistantMessageStyles}
                >
                  <div className="flex space-x-1">
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{
                        backgroundColor: primaryColor || "#06b6d4",
                        animationDelay: "0ms",
                      }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{
                        backgroundColor: primaryColor || "#06b6d4",
                        animationDelay: "150ms",
                      }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{
                        backgroundColor: primaryColor || "#06b6d4",
                        animationDelay: "300ms",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="p-2 border-t"
            style={{
              borderColor: dynamicStyles.borderColor,
              backgroundColor: `${backgroundColor || "#08090A"}CC`,
            }}
          >
            <div className="mb-1.5 flex flex-wrap gap-1">
              {config.suggestedQuestions?.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question.text)}
                  className="text-[10px] rounded-full px-1.5 py-0.5 transition-colors"
                  style={suggestedButtonStyles}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor =
                      suggestedButtonStyles.hoverBackgroundColor;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor =
                      suggestedButtonStyles.backgroundColor;
                  }}
                >
                  {question.text.split(" ")[0]}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 border-none text-xs h-7 px-2"
                style={{
                  backgroundColor: `${backgroundColor || "#08090A"}CC`,
                  color: textColor || "#FFFFFF",
                }}
              />
              <Button
                type="submit"
                disabled={isTyping}
                variant="ghost"
                size="icon"
                className="h-7 w-7 p-1"
                style={{
                  color: primaryColor || "#06b6d4",
                }}
              >
                <Send className="h-3 w-3" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
