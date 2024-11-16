import React from "react";
import { Grid } from "./grid";

export const FeaturesGrid = () => {
  const grid = [
    {
      title: "Custom Software Development",
      description:
        "We build tailored applications to meet your unique business needs, ensuring scalability and efficiency.",
    },
    {
      title: "E-commerce Solutions",
      description:
        "Design and develop powerful e-commerce platforms with seamless user experiences and integrated payment systems.",
    },
    {
      title: "API Integrations",
      description:
        "Connect your tools and platforms with custom API integrations to streamline workflows and automate processes.",
    },
    {
      title: "Data-Driven Dashboards",
      description:
        "Create interactive dashboards to visualize key metrics, providing actionable insights for your business.",
    },
    {
      title: "Internal Tools and Apps",
      description:
        "Develop internal applications to enhance team productivity, manage workflows, and simplify operations.",
    },
    {
      title: "Content Management Systems",
      description:
        "Build dynamic CMS solutions to manage and publish content effortlessly across multiple platforms.",
    },
    {
      title: "Custom Chatbots",
      description:
        "Deploy intelligent chatbots that leverage your data to provide precise answers and improve user interactions.",
    },
    {
      title: "Landing Pages and Templates",
      description:
        "Create high-performing landing pages and customizable templates to support your marketing campaigns and branding efforts.",
    },
  ];
  
  return (
    <div className="py-20 lg:py-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {grid.map((feature, idx) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
