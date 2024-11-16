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
          Websites, Apps, and Tools for Your Business
        </Heading>
        <Subheading>
          From websites to internal apps, we deliver what your team needs.
        </Subheading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 py-10">
          <Card className="lg:col-span-2">
            <CardTitle>Connecting Your Tools</CardTitle>
            <CardDescription>
              Reduce manual work with smart integrations tailored for you.
            </CardDescription>

            <CardSkeletonContainer>
              <SkeletonOne />
            </CardSkeletonContainer>
          </Card>
          <Card>
            <CardSkeletonContainer className="max-w-[16rem] mx-auto">
              <SkeletonTwo />
            </CardSkeletonContainer>
            <CardTitle>Internal Software Solutions</CardTitle>
            <CardDescription>
              Develop software to improve internal workflows, streamline
              operations, and enhance team productivity.
            </CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer>
              <SkeletonThree />
            </CardSkeletonContainer>
            <CardTitle>API Integrations</CardTitle>
            <CardDescription>
              Connect tools like Webflow, Slack, and GPT to automate workflows
              and reduce manual work.
            </CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer
              showGradient={false}
              className="max-w-[16rem] mx-auto"
            >
              <SkeletonFour />
            </CardSkeletonContainer>
            <CardTitle>Custom Websites and Landing Pages</CardTitle>
            <CardDescription>
              We design and build websites and landing pages tailored to your
              business needs, ensuring great performance and usability.
            </CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer>
              <SkeletonFive />
            </CardSkeletonContainer>
            <CardTitle>Optimized Online Stores</CardTitle>
            <CardDescription>
              Build e-commerce platforms with fast performance, seamless
              navigation, and tools to boost sales and user satisfaction.
            </CardDescription>
          </Card>
        </div>
      </Container>
    </GradientContainer>
  );
};
