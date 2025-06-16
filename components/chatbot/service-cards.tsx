"use client"

import { CardBody, CardContainer, CardItem } from "@/components/ui/aceternity/3d-card"
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient"
import { cn } from "@/lib/utils"

export default function ServiceCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 max-w-5xl mx-auto">
      <ServiceCard
        title="AI Solutions"
        description="Cutting-edge artificial intelligence solutions tailored to your business needs."
        icon="🤖"
        gradient="from-blue-500 to-cyan-500"
      />
      <ServiceCard
        title="Cloud Services"
        description="Scalable and secure cloud infrastructure for your growing business."
        icon="☁️"
        gradient="from-purple-500 to-indigo-500"
      />
      <ServiceCard
        title="Data Analytics"
        description="Transform your raw data into actionable business insights."
        icon="📊"
        gradient="from-cyan-500 to-emerald-500"
      />
    </div>
  )
}

function ServiceCard({
  title,
  description,
  icon,
  gradient,
}: {
  title: string
  description: string
  icon: string
  gradient: string
}) {
  return (
    <BackgroundGradient className={cn("rounded-[22px] p-0.5", gradient)}>
      <CardContainer className="py-0">
        <CardBody className="bg-black rounded-[20px] p-6 h-full">
          <CardItem translateZ={50} className="text-4xl mb-4">
            {icon}
          </CardItem>
          <CardItem translateZ={60} className="text-xl font-bold text-white mb-2">
            {title}
          </CardItem>
          <CardItem translateZ={40} className="text-sm text-neutral-300">
            {description}
          </CardItem>
          <CardItem translateZ={80} className="mt-4">
            <button className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm border-none">
              Learn More
            </button>
          </CardItem>
        </CardBody>
      </CardContainer>
    </BackgroundGradient>
  )
}
