// @ts-nocheck
import React from "react";
import { TechIcon, getTechIcon } from "./utils/tech-icons";

// Example component showing how to use the new tech icons
export const TechIconExample = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Using TechIcon Component</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center space-y-2">
          <TechIcon name="React" className="w-8 h-8 text-blue-500" />
          <span className="text-sm">React</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <TechIcon name="Next.js" className="w-8 h-8 text-gray-700" />
          <span className="text-sm">Next.js</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <TechIcon name="TypeScript" className="w-8 h-8 text-blue-600" />
          <span className="text-sm">TypeScript</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <TechIcon name="Tailwind CSS" className="w-8 h-8 text-cyan-500" />
          <span className="text-sm">Tailwind</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-8">Using getTechIcon Function</h3>
      <div className="grid grid-cols-4 gap-4">
        {["Node.js", "PostgreSQL", "Docker", "OpenAI"].map((tech) => {
          const IconComponent = getTechIcon(tech);
          return (
            <div key={tech} className="flex flex-col items-center space-y-2">
              <IconComponent className="w-8 h-8 text-green-500" />
              <span className="text-sm">{tech}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
