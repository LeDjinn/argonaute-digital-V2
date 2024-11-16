"use client";
import { testimonials } from "@/constants/page-testimonials";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import { AmbientColor } from "../ambient-color";
import { FeatureIconContainer } from "../features/feature-icon-container";
import { TbLocationBolt } from "react-icons/tb";
import { Heading } from "../heading";
import { Subheading } from "../subheading";

export const TestimonialsMarquee = () => {
  return (
    <div className="relative pb-40">
      <div className="pb-20">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <TbLocationBolt className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading className="pt-4">Apps and Websites We've Built</Heading>
        <Subheading>
          Explore the custom applications and websites we’ve developed for
          businesses and teams.
        </Subheading>
      </div>

      <div className="relative">
        <div className="h-full w-10 md:w-80 absolute left-0 inset-y-0 bg-gradient-to-r from-charcoal to-transparent pointer-events-none z-40"></div>
        <div className="h-full w-10 md:w-80 absolute right-0 inset-y-0 bg-gradient-to-l from-charcoal to-transparent pointer-events-none z-40"></div>
        <Marquee pauseOnHover className="h-full">
          {testimonials.map((testimonial, index) => (
            <Card
              key={`testimonial-${testimonial.src}-${index}`}
              className="flex flex-col items-center"
            >
              {/* Full-width Image */}
              <div className="w-full h-[200px]">
                {" "}
                {/* Enforces a fixed height */}
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={300} // Adjust width as needed
                  height={200} // Adjust height as needed
                  className="rounded-t-lg object-cover w-full h-full"
                />
              </div>
              {/* Text Content */}
              <div className="flex flex-col items-center p-4">
                <Quote className="text-center">{testimonial.quote}</Quote>
                <div className="mt-4 text-center">
                  <QuoteDescription className="text-neutral-300 font-semibold">
                    {testimonial.name}
                  </QuoteDescription>
                  <QuoteDescription className="text-neutral-400">
                    {testimonial.designation}
                  </QuoteDescription>
                </div>
                {/* Link to website */}
                {testimonial.website && (
                  <a
                    href={testimonial.website} // Add the website URL in your data
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mt-2"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </Card>
          ))}
        </Marquee>
        <Marquee
          direction="right"
          className="mt-8 h-full"
          speed={40}
          pauseOnHover
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={`testimonial-${testimonial.src}-${index}`}
              className="flex flex-col items-center"
            >
              {/* Full-width Image */}
              <div className="w-full h-[200px]">
                {" "}
                {/* Enforces a fixed height */}
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={300} // Adjust width as needed
                  height={200} // Adjust height as needed
                  className="rounded-t-lg object-cover w-full h-full"
                />
              </div>
              {/* Text Content */}
              <div className="flex flex-col items-center p-4">
                <Quote className="text-center">{testimonial.quote}</Quote>
                <div className="mt-4 text-center">
                  <QuoteDescription className="text-neutral-300 font-semibold">
                    {testimonial.name}
                  </QuoteDescription>
                  <QuoteDescription className="text-neutral-400">
                    {testimonial.designation}
                  </QuoteDescription>
                </div>
                {/* Link to website */}
                {testimonial.website && (
                  <a
                    href={testimonial.website} // Add the website URL in your data
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mt-2"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </Card>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "p-8 rounded-xl h-full max-w-lg mx-2 border border-[rgba(255,255,255,0.10)] bg-[rgba(40,40,40,0.30)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn("text-base font-semibold text-white py-2", className)}>
      {children}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn("text-sm font-normal text-neutral-400 max-w-sm", className)}
    >
      {children}
    </p>
  );
};
