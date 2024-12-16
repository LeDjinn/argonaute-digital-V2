import { AmbientColor } from "@/components/ambient-color";
import { FeatureIconContainer } from "@/components/features/feature-icon-container";
import { Heading } from "@/components/heading";
import ClientCard from "@/components/price-offers/client-card";
import TechCard from "@/components/price-offers/project-description-card";
import TaskEstimationTable from "@/components/price-offers/task-estimation-table";
import { PricingGrid } from "@/components/pricing-grid";
import { Subheading } from "@/components/subheading";
import { IconReceiptFilled } from "@tabler/icons-react";
const clientInfo = {
  email: "contact@top-turnover.ai",
  phone: "01 41 32 53 60",
  address: ["Tour CB16 - Liberty,", "17 Pl. des Reflets,", "92400 Courbevoie"],
};
const techInfo = {
  description: "Tableau de bord pour la gestion RH de l'entreprise",
  techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  fileName: "Intro Tim Cahier de Charge.pdf",
};
export default function page() {
  return (
    <div className="relative overflow-hidden max-w-[1080px] mx-auto">
      <AmbientColor />
      <div className="py-20 sm:py-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconReceiptFilled className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading as="h1" className="mt-4">
          Devis Top-Turnover 16/12/24
        </Heading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full relative z-20">
        <div className="w-full">
          <ClientCard {...clientInfo} />
        </div>
        <div className="w-full">
          <TechCard {...techInfo} />
        </div>
      </div>
      <div className="py-4"></div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-200 text-center mb-4">
          Estimation du developpement
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Voici une estimation détaillée des fonctionalités nécessaires à la
          réalisation du projet.
        </p>
        <TaskEstimationTable />
      </div>
      <div className="py-12">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Livrables</h2>
        <p className="text-gray-300 mb-4">
          Les éléments suivants seront livrés au client à la fin du projet :
        </p>
        <ul className="list-disc list-inside text-gray-300">
          <li>Code source complet et fonctionnel</li>
          <li>Interfaces graphiques validées</li>
          <li>Tests unitaires et fonctionnels</li>
        </ul>
      </div>
      <div className="py-12">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Méthodologie
        </h2>
        <p className="text-gray-300 mb-4">
          Le développement se déroulera en 3 phases principales :
        </p>
        <ol className="list-decimal list-inside text-gray-300">
          <li>Conception des interfaces utilisateur </li>
          <li>Application de la logique de filtre et interactions </li>
          <li>Premiers tests en internes</li>
          <li>Validation des fonctionnalités avec le client</li>
        </ol>
      </div>
      <div className="py-12">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Conditions Générales
        </h2>
        <p className="text-gray-300 mb-4">
          Ce devis est valable pour une durée de 30 jours à compter de sa date
          d’émission. Les paiements se feront en trois tranches : 30% à la
          commande, 40% à mi-parcours, et 30% à la livraison finale.
        </p>
      </div>

      {/* Engagements et Prochaines Étapes */}
      <div className="py-12 pb-40">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Engagements et Prochaines Étapes
        </h2>
        <p className="text-gray-300 mb-4">
          Pour valider ce devis, veuillez me contacter par mail. Une fois
          validé, nous programmerons un kick-off meeting pour lancer le projet.
        </p>
      </div>
      <div className="pb-40"></div>
    </div>
  );
}
