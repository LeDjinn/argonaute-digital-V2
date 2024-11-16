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
import frenchText from "@/app/messages/fr.json";
import englishText from "@/app/messages/en.json";

export const Features = ({ locale }: { locale: string }) => {
  const text = locale === "fr" ? frenchText.features : englishText.features;
  return (
    <GradientContainer className="md:my-20">
      <Container className="py-20 max-w-5xl mx-auto relative z-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <FaBolt className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading className="pt-4">{text.heading}</Heading>
        <Subheading>{text.subheading}</Subheading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 py-10">
          <Card className="lg:col-span-2">
            <CardTitle> {text.cards[0].title}</CardTitle>
            <CardDescription>{text.cards[0].description}</CardDescription>

            <CardSkeletonContainer>
              <SkeletonOne />
            </CardSkeletonContainer>
          </Card>
          <Card>
            <CardSkeletonContainer className="max-w-[16rem] mx-auto">
              <SkeletonTwo />
            </CardSkeletonContainer>
            <CardTitle> {text.cards[1].title}</CardTitle>
            <CardDescription>{text.cards[1].description}</CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer>
              <SkeletonThree />
            </CardSkeletonContainer>
            <CardTitle> {text.cards[2].title}</CardTitle>
            <CardDescription>{text.cards[2].description}</CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer
              showGradient={false}
              className="max-w-[16rem] mx-auto"
            >
              <SkeletonFour />
            </CardSkeletonContainer>
            <CardTitle> {text.cards[3].title}</CardTitle>
            <CardDescription>{text.cards[3].description}</CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer>
              <SkeletonFive />
            </CardSkeletonContainer>
            <CardTitle> {text.cards[4].title}</CardTitle>
            <CardDescription>{text.cards[4].description}</CardDescription>
          </Card>
        </div>
      </Container>
    </GradientContainer>
  );
};
