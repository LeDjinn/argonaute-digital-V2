"use client";
import React, { useState } from "react";
import Accordion from "./accordion";
import { Heading } from "./heading";

const questions = [
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


export const FAQs = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-20 px-8">
      <Heading className="pt-4">Frequently asked questions</Heading>
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
