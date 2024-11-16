"use client";
import React, { useState } from "react";
import Accordion from "./accordion";
import { Heading } from "./heading";
import englishText from "@/app/messages/en.json";
import frenchText from "@/app/messages/fr.json";

const questionsEn = [
  {
    id: 1,
    title: "What is Argonaute Digital?",
    description:
      "Argonaute Digital is a digital agency focused on delivering custom solutions tailored to your unique business needs, from API integrations to modern web applications.",
  },
  {
    id: 2,
    title: "How does Argonaute Digital enhance my business?",
    description:
      "We provide bespoke API integrations, automation, and tailored SaaS solutions that streamline workflows and connect your digital tools seamlessly.",
  },
  {
    id: 3,
    title: "Can Argonaute Digital integrate with external tools?",
    description:
      "Yes, we specialize in connecting with a wide array of popular tools, including Slack, Coda, Mailchimp, and more, ensuring cohesive digital operations.",
  },
  {
    id: 4,
    title: "What makes Argonaute Digital's web solutions unique?",
    description:
      "Our web applications are crafted with user-centric design, creating captivating experiences that go beyond functionality to engage your audience deeply.",
  },
  {
    id: 5,
    title: "Does Argonaute Digital provide analytics and reporting?",
    description:
      "We offer advanced tagging and reporting options, providing actionable insights and comprehensive analytics to support data-driven decision-making.",
  },
  {
    id: 6,
    title: "Are Argonaute Digital's solutions suitable for small businesses?",
    description:
      "Yes, our solutions are designed to be scalable and adaptable, making them ideal for businesses of all sizes.",
  },
  {
    id: 7,
    title: "Can Argonaute Digital help with SEO and digital visibility?",
    description:
      "Our team crafts targeted SEO strategies to boost your online presence, optimizing your site’s performance to engage audiences effectively.",
  },
  {
    id: 8,
    title: "What kind of support does Argonaute Digital offer?",
    description:
      "We provide ongoing support to ensure your digital solutions continue to meet your business goals, from setup to regular optimizations.",
  },
  {
    id: 9,
    title: "Does Argonaute Digital offer a consultation?",
    description:
      "Yes, we offer a consultation to understand your business needs and discuss how our services can align with your objectives.",
  },
  {
    id: 10,
    title: "How can I get started with Argonaute Digital?",
    description:
      "Simply contact us to discuss your needs, and our team will guide you through our process to craft a solution that aligns perfectly with your goals.",
  },
];

const questionsFr = [
  {
    id: 1,
    title: "Qu'est-ce qu'Argonaute Digital ?",
    description:
      "Argonaute Digital est une agence numérique spécialisée dans la création de solutions sur mesure adaptées aux besoins uniques de votre entreprise, allant des intégrations API aux applications web modernes.",
  },
  {
    id: 2,
    title: "Comment Argonaute Digital améliore-t-il mon entreprise ?",
    description:
      "Nous proposons des intégrations API personnalisées, de l'automatisation et des solutions SaaS sur mesure qui simplifient les flux de travail et connectent vos outils numériques de manière fluide.",
  },
  {
    id: 3,
    title: "Argonaute Digital peut-il s'intégrer avec des outils externes ?",
    description:
      "Oui, nous sommes spécialisés dans la connexion avec une large gamme d'outils populaires, notamment Slack, Coda, Mailchimp, et bien d'autres, pour assurer une opération numérique cohérente.",
  },
  {
    id: 4,
    title: "Qu'est-ce qui rend les solutions web d'Argonaute Digital uniques ?",
    description:
      "Nos applications web sont conçues avec une approche centrée sur l'utilisateur, créant des expériences captivantes qui vont au-delà de la fonctionnalité pour engager profondément votre audience.",
  },
  {
    id: 5,
    title: "Argonaute Digital propose-t-il des analyses et des rapports ?",
    description:
      "Nous offrons des options avancées de tagging et de reporting, fournissant des analyses complètes et des informations exploitables pour soutenir une prise de décision basée sur les données.",
  },
  {
    id: 6,
    title:
      "Les solutions d'Argonaute Digital conviennent-elles aux petites entreprises ?",
    description:
      "Oui, nos solutions sont conçues pour être évolutives et adaptables, ce qui les rend idéales pour les entreprises de toutes tailles.",
  },
  {
    id: 7,
    title:
      "Argonaute Digital peut-il aider avec le SEO et la visibilité numérique ?",
    description:
      "Notre équipe élabore des stratégies SEO ciblées pour renforcer votre présence en ligne, optimisant les performances de votre site pour engager efficacement les audiences.",
  },
  {
    id: 8,
    title: "Quel type de support offre Argonaute Digital ?",
    description:
      "Nous fournissons un support continu pour garantir que vos solutions numériques continuent de répondre aux objectifs de votre entreprise, de la mise en place aux optimisations régulières.",
  },
  {
    id: 9,
    title: "Argonaute Digital propose-t-il une consultation ?",
    description:
      "Oui, nous proposons une consultation pour comprendre les besoins de votre entreprise et discuter de la manière dont nos services peuvent s'aligner sur vos objectifs.",
  },
  {
    id: 10,
    title: "Comment puis-je commencer avec Argonaute Digital ?",
    description:
      "Contactez-nous simplement pour discuter de vos besoins, et notre équipe vous guidera à travers notre processus pour élaborer une solution parfaitement adaptée à vos objectifs.",
  },
];

export const FAQs = ({ locale }: { locale: string }) => {
  const questions = locale === "fr" ? questionsFr : questionsEn;
  const text = locale === "fr" ? frenchText.faq : englishText.faq;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-20 px-8">
      <Heading className="pt-4">{text.heading}</Heading>
      <div className="grid  gap-10 pt-20">
        {questions.map((item, i) => (
          <Accordion
            key={i}
            i={i}
            expanded={expanded}
            setExpanded={setExpanded}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};
