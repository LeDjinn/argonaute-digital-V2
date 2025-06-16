# Integration Guide for Tech Stack Sections

This guide explains how to integrate the React, Next.js, Node.js, and AI Integration sections into your existing project.

## Step 1: Add the Custom CSS

Add the `custom-animations.css` file to your project. You can either:

1. Import it directly in your global CSS file:
   \`\`\`css
   @import './custom-animations.css';
   \`\`\`

2. Or copy the contents into your existing global CSS file.

The CSS file contains only the animations and special effects, while the core styling remains in the components using Tailwind classes.

## Step 2: Import the Components

Import the components in your page or layout file:

\`\`\`tsx
import ReactToolsSection from "@/react-tools-section"
import NextjsToolsSection from "@/nextjs-tools-section"
import NodejsToolsSection from "@/nodejs-tools-section"
import AiIntegrationSection from "@/ai-integration-section"

export default function YourPage() {
  return (
    <main>
      <ReactToolsSection />
      <NextjsToolsSection />
      <NodejsToolsSection />
      <AiIntegrationSection />
    </main>
  )
}
\`\`\`

## Step 3: Add the Images

Make sure to add the following images to your project:

- `/react-component-visualization.png`
- `/nextjs-dashboard.png`
- `/nodejs-server-architecture.png`
- `/ai-integration-visualization.png`

## Step 4: Customize the Styling (Optional)

If you want to customize the styling to match your brand:

1. Modify the color values in `custom-animations.css` (especially the CSS variables in the `:root` section)
2. Use the custom class names (like `section-heading`, `section-feature`, etc.) in your global CSS to override styles

## Adapting to Your CSS Framework

If you're not using Tailwind CSS:

1. The components use both Tailwind classes and custom class names (prefixed with `section-`)
2. You can target these custom class names in your CSS to override the styling
3. For example:
   \`\`\`css
   .section-heading {
     /* Your custom styles */
   }
   
   .section-feature:hover {
     /* Your custom hover styles */
   }
   \`\`\`

## Dependencies

Make sure you have the following dependencies installed:

- framer-motion
- lucide-react
- next/image (comes with Next.js)
