import type { Metadata } from "next";
import "./globals.css";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import type { Viewport } from "next";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const baseUrl = "https://argonaute-digital.vercel.app";

const siteContent = {
  en: {
    title: "Argonaute Digital — Senior Full-Stack Engineering & Cloud Architecture",
    description:
      "Production-ready software for teams that can't afford to get it wrong. Senior Next.js, TypeScript and AI-assisted engineering for agencies, founders and product teams.",
  },
  fr: {
    title: "Argonaute Digital — Ingénierie Full-Stack Senior & Architecture Cloud",
    description:
      "Des logiciels prêts pour la production pour les équipes qui ne peuvent pas se permettre l'erreur. Ingénierie senior Next.js, TypeScript et assistée par IA pour les agences, les fondateurs et les équipes produit.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as "en" | "fr";
  const content = siteContent[locale] ?? siteContent.en;

  return {
    metadataBase: new URL(baseUrl),
    title: content.title,
    description: content.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: `${baseUrl}/${locale}`,
      siteName: "Argonaute Digital",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: "/banner.png",
          width: 1200,
          height: 630,
          alt: "Argonaute Digital — Senior Full-Stack Engineering",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: ["/banner.png"],
    },
    icons: {
      icon: [{ url: "/logos/tete_rebot.svg", type: "image/svg+xml" }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <ViewTransitions>
      <html lang={params.locale}>
        <body
          className={cn(
            inter.variable,
            ibmPlexMono.variable,
            "font-sans bg-base text-text-primary antialiased min-h-screen"
          )}
        >
          <NavBar locale={params.locale} />
          {children}
          <Footer locale={params.locale} />
        </body>
      </html>
    </ViewTransitions>
  );
}
