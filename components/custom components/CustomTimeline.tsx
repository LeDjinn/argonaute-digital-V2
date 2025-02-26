import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { FaClipboardList, FaLaptopCode, FaRocket } from "react-icons/fa";

export function CustomTimeline({locale}: {locale: string}) {
  const dataEn = [
    {
      title: <div><span className="text-white">Step1:</span><br></br>Requirement and Gathering</div>,
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
      title: <div><span className="text-white">Step 2:</span><br></br>Design and Prototyping</div>,
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
      title: <div><span className="text-white">Step 3:</span><br></br>Development and Testing</div>,
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
      title: <div><span className="text-white">Step 4:</span><br></br>Deployment and Support</div>,
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
      title: <div><span className="text-white">Étape 1 :</span><br></br>Collecte des Besoins</div>,
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
      title: <div><span className="text-white">Étape 2 :</span><br></br>Conception et Prototypage</div>,
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
      title: <div><span className="text-white">Étape 3 :</span><br></br>Développement et Tests</div>,
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
      title: <div><span className="text-white">Étape 4 :</span><br></br>Déploiement et Support</div>,
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
