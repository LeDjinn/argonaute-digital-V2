// @ts-nocheck
import React from "react";
import {
  // Frontend
  Atom, // React
  Triangle, // Next.js
  FileCode2, // TypeScript
  Palette, // Tailwind CSS
  Zap, // Framer Motion
  Component, // shadcn/ui

  // Backend
  Server, // Node.js
  Layers, // NestJS
  Route, // Express
  Network, // tRPC
  Share2, // GraphQL
  Globe, // REST

  // Database
  Database, // PostgreSQL
  Zap as SupabaseIcon, // Supabase (using Zap as alternative)
  Box, // Prisma
  Leaf, // MongoDB
  Cpu, // Redis
  Droplets, // Drizzle

  // AI & ML
  Brain, // OpenAI
  Link, // Langchain
  Pin, // Pinecone
  Sparkles, // Vercel AI SDK
  Heart, // HuggingFace
  Workflow, // TensorFlow

  // DevOps
  Rocket, // Vercel
  GitBranch, // GitHub Actions
  Container, // Docker
  Compass, // Kubernetes
  Settings, // Terraform
  Cloud, // AWS

  // Testing
  TestTube, // Jest
  Eye, // Cypress
  Play, // Playwright
  Beaker, // Vitest
  CheckCircle, // Testing Library
  Book, // Storybook
} from "lucide-react";

export const getTechIcon = (toolName: string): React.ComponentType<any> => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    // Frontend
    React: Atom,
    "Next.js": Triangle,
    TypeScript: FileCode2,
    "Tailwind CSS": Palette,
    "Framer Motion": Zap,
    "shadcn/ui": Component,

    // Backend
    "Node.js": Server,
    NestJS: Layers,
    Express: Route,
    tRPC: Network,
    GraphQL: Share2,
    REST: Globe,

    // Database
    PostgreSQL: Database,
    Supabase: SupabaseIcon,
    Prisma: Box,
    MongoDB: Leaf,
    Redis: Cpu,
    Drizzle: Droplets,

    // AI & ML
    OpenAI: Brain,
    Langchain: Link,
    Pinecone: Pin,
    "Vercel AI SDK": Sparkles,
    HuggingFace: Heart,
    TensorFlow: Workflow,

    // DevOps
    Vercel: Rocket,
    "GitHub Actions": GitBranch,
    Docker: Container,
    Kubernetes: Compass,
    Terraform: Settings,
    AWS: Cloud,

    // Testing
    Jest: TestTube,
    Cypress: Eye,
    Playwright: Play,
    Vitest: Beaker,
    "Testing Library": CheckCircle,
    Storybook: Book,
  };

  return iconMap[toolName] || FileCode2; // Default icon if not found
};

// Helper component to render tech icons with consistent styling
export const TechIcon = ({
  name,
  className = "w-6 h-6",
}: {
  name: string;
  className?: string;
}) => {
  const IconComponent = getTechIcon(name);
  return <IconComponent className={className} />;
};
