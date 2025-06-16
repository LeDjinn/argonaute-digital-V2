// Types for the chatbot package

// Bot mood type
export type BotMood = "neutral" | "curious" | "surprised" | "happy" | "sleepy"

// Message type
export type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  action?: "scroll" | "navigate" | "replace" | null
  target?: string
}

// Section configuration
export type SectionConfig = {
  // Key is the keyword to trigger scrolling, value is the section ID
  [keyword: string]: string
}

// Page configuration
export type PageConfig = {
  // Key is the keyword to trigger navigation, value is the page route
  [keyword: string]: string
}

// Action configuration
export type ActionConfig = {
  // Key is the keyword to trigger an action, value is the action configuration
  [keyword: string]: {
    type: "scroll" | "navigate" | "replace"
    target: string
    response: string
  }
}

// Suggested question type
export type SuggestedQuestion = {
  text: string
  action: string
}

// Main configuration type
export type CompactChatbotConfig = {
  // OpenAI configuration
  useOpenAI?: boolean
  openAIApiKey?: string
  openAIModel?: string

  // UI configuration
  initialGreeting?: string
  suggestedQuestions?: SuggestedQuestion[]
  locale?: string
  position?: "top-right" | "top-left" | "top-center"

  // Navigation configuration
  sections?: SectionConfig
  pages?: PageConfig

  // Advanced configuration
  actions?: ActionConfig
  systemPrompt?: string

  // Styling
  theme?: {
    primaryColor?: string
    backgroundColor?: string
    textColor?: string
    botColor?: string
  }
}
