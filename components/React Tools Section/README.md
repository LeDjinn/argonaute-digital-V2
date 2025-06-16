# Tech Stack Sections

This package contains five internationalized React components for showcasing your tech stack:

1. **WebAppsSection** - Showcases React & Next.js capabilities
2. **ApiSection** - Highlights Node.js & NestJS backend services
3. **AiIntegrationSection** - Demonstrates AI integration capabilities
4. **TechRadarSection** - Displays your technology ecosystem with categorization
5. **ClientLogosSection** - Shows client logos in an infinite carousel

## Installation

1. Copy the following files to your project:
   - `web-apps-section.tsx`
   - `api-section.tsx`
   - `ai-integration-section.tsx`
   - `tech-radar-section.tsx`
   - `client-logos-section.tsx`
   - `locales/web-apps.json`
   - `locales/api.json`
   - `locales/ai-integration.json`
   - `locales/tech-radar.json`
   - `locales/client-logos.json`
   - `custom-animations.css`
   - `index.ts` (optional, for easy exports)

2. Make sure you have the required dependencies:
   - Next.js
   - React
   - framer-motion
   - lucide-react

3. Add the required images to your public folder:
   - `/react-component-visualization.png`
   - `/nextjs-dashboard.png`
   - `/nodejs-server-architecture.png`
   - `/nestjs-architecture.png`
   - `/ai-integration-visualization.png`
   - `/abstract-tech-logo-blue.png`
   - `/futuristic-wave-logo.png`
   - `/nexus-group-logo.png`
   - Tech icons in `/tech-icons/` folder

## Usage

Import the components in your page:

\`\`\`tsx
import { 
  WebAppsSection, 
  ApiSection, 
  AiIntegrationSection,
  TechRadarSection,
  ClientLogosSection
} from './path/to/components';

export default function YourPage() {
  // Get locale from your app's i18n system
  const locale = "en"; // or "fr" or any other supported locale

  return (
    <main>
      <WebAppsSection locale={locale} />
      <ApiSection locale={locale} />
      <AiIntegrationSection locale={locale} />
      <TechRadarSection locale={locale} />
      <ClientLogosSection locale={locale} />
    </main>
  );
}
\`\`\`

## Customization

### Adding New Languages

To add a new language, update each JSON file in the `locales` folder with a new language key and translations.

### Styling

The components use Tailwind CSS for styling. The primary color is set to `#06B0D4` (cyan). You can modify this in the component files to match your brand colors.

The `custom-animations.css` file contains animations used by the components. Import this file in your global CSS or component.

### Images

Replace the placeholder images with your own images to showcase your specific tech stack and projects.

### Tech Radar

The Tech Radar section requires tech icons in the `/tech-icons/` folder. You can replace these with your own icons or use the ones provided.

### Client Logos

The Client Logos section requires client logo images. Replace the placeholder images with your actual client logos.
