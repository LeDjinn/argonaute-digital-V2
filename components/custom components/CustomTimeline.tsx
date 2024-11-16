import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { FaClipboardList, FaLaptopCode, FaRocket } from "react-icons/fa";

export function CustomTimeline({locale}: {locale: string}) {
  const dataEn = [
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
  const dataFr = [
    {
      title: "Étape 1 : Collecte des Besoins",
      content: (
        <div className="flex items-center gap-4">
          <FaClipboardList className="text-cyan-500 w-6 h-6" />
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            Nous commençons par comprendre vos objectifs, collecter vos besoins et réfléchir à des solutions adaptées à vos attentes.
          </p>
        </div>
      ),
    },
    {
      title: "Étape 2 : Conception et Prototypage",
      content: (
        <div className="flex items-center gap-4">
          <FaLaptopCode className="text-cyan-500 w-6 h-6" />
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            Notre équipe conçoit une interface conviviale et crée des prototypes pour visualiser le produit final.
          </p>
        </div>
      ),
    },
    {
      title: "Étape 3 : Développement et Tests",
      content: (
        <div className="flex items-center gap-4">
          <FaRocket className="text-cyan-500 w-6 h-6" />
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            Nous développons votre application, la testons rigoureusement pour garantir sa qualité, et l&apos;améliorons en fonction des retours.
          </p>
        </div>
      ),
    },
    {
      title: "Étape 4 : Déploiement et Support",
      content: (
        <div className="flex items-center gap-4">
          <FaRocket className="text-cyan-500 w-6 h-6" />
          <p className="text-neutral-200 text-xs md:text-sm font-normal">
            Enfin, nous déployons la solution et fournissons un support continu pour garantir son bon fonctionnement.
          </p>
        </div>
      ),
    },
  ];
    const data = locale === "fr" ? dataFr : dataEn;

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
