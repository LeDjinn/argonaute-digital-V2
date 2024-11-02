import React from "react";
import { GradientContainer } from "../gradient-container";
import { Container } from "../container";
import { Heading } from "../heading";
import { Subheading } from "../subheading";
import { FeatureIconContainer } from "./feature-icon-container";
import { FaBolt, FaChartLine } from "react-icons/fa";
import {
  Card,
  CardDescription,
  CardSkeletonContainer,
  CardTitle,
} from "./card";
import { SkeletonOne } from "./skeletons/first";
import { SkeletonTwo } from "./skeletons/second";
import { SkeletonThree } from "./skeletons/third";
import { SkeletonFour } from "./skeletons/fourth";
import { SkeletonFive } from "./skeletons/fifth";

export const Features = () => {
  return (
    <GradientContainer className="md:my-20">
    <Container className="py-20 max-w-5xl mx-auto relative z-40">
      <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
        <FaBolt className="h-6 w-6 text-cyan-500" />
      </FeatureIconContainer>
      <Heading className="pt-4">
        Transform Your Digital Workflow
      </Heading>
      <Subheading>
        Unlock seamless connectivity and enhance your business operations through tailored digital solutions.
      </Subheading>
  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 py-10">
        <Card className="lg:col-span-2">
          <CardTitle>API Integration for Cohesive Operations</CardTitle>
          <CardDescription>
            Connect your digital tools with customized API integrations that reduce manual work and foster seamless data flow.
          </CardDescription>
  
          <CardSkeletonContainer>
            <SkeletonOne />
          </CardSkeletonContainer>
        </Card>
        <Card>
          <CardSkeletonContainer className="max-w-[16rem] mx-auto">
            <SkeletonTwo />
          </CardSkeletonContainer>
          <CardTitle>Data-Driven Insights</CardTitle>
          <CardDescription>
            Access comprehensive analytics and insights to drive informed decisions and optimize engagement.
          </CardDescription>
        </Card>
        <Card>
          <CardSkeletonContainer>
            <SkeletonThree />
          </CardSkeletonContainer>
          <CardTitle>AI-Powered Automation</CardTitle>
          <CardDescription>
            Implement AI-driven automation to streamline processes and make data management effortless.
          </CardDescription>
        </Card>
        <Card>
          <CardSkeletonContainer
            showGradient={false}
            className="max-w-[16rem] mx-auto"
          >
            <SkeletonFour />
          </CardSkeletonContainer>
          <CardTitle>Flexible Platform Compatibility</CardTitle>
          <CardDescription>
            Work effortlessly across platforms like Shopify and Next.js, with custom solutions to meet your unique needs.
          </CardDescription>
        </Card>
        <Card>
          <CardSkeletonContainer>
            <SkeletonFive />
          </CardSkeletonContainer>
          <CardTitle>Audience Engagement Strategy</CardTitle>
          <CardDescription>
            Craft targeted strategies based on audience insights, enhancing engagement and aligning with your goals.
          </CardDescription>
        </Card>
      </div>
    </Container>
  </GradientContainer>
  
  );
};
