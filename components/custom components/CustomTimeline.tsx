import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { FaClipboardList, FaLaptopCode, FaRocket } from "react-icons/fa";

export function CustomTimeline() {
  const data = [
    {
      title: "Step 1: Requirement Gathering",
      content: (
        <div className="flex items-center gap-4">
          <FaClipboardList className="text-cyan-500 w-6 h-6" />
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            We start by understanding your goals, gathering requirements, and brainstorming solutions tailored to your needs.
          </p>
        </div>
      ),
    },
    {
      title: "Step 2: Design and Prototyping",
      content: (
        <div className="flex items-center gap-4">
          <FaLaptopCode className="text-cyan-500 w-6 h-6" />
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            Our team designs a user-friendly interface and creates prototypes to visualize the end product.
          </p>
        </div>
      ),
    },
    {
      title: "Step 3: Development and Testing",
      content: (
        <div className="flex items-center gap-4">
          <FaRocket className="text-cyan-500 w-6 h-6" />
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            We develop your application, rigorously test it for quality assurance, and refine it based on feedback.
          </p>
        </div>
      ),
    },
    {
      title: "Step 4: Deployment and Support",
      content: (
        <div className="flex items-center gap-4">
          <FaRocket className="text-cyan-500 w-6 h-6" />
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            Finally, we deploy the solution and provide ongoing support to ensure it runs smoothly.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
