import React from "react";
import { Container } from "./container";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { Button } from "./button";
import { Grid } from "./features/grid";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { IconMailFilled } from "@tabler/icons-react";
import frenchtext from "@/app/messages/fr.json";
import englishtext from "@/app/messages/en.json";

export const ContactForm = ({locale}:{locale:string}) => {
  const text = locale === 'fr' ? frenchtext.contact : englishtext.contact;
  return (
    <Container className="py-40 md:py-60 grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
      <div>
        <div className="flex">
          <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
            <IconMailFilled className="h-6 w-6 text-cyan-500" />
          </FeatureIconContainer>
        </div>
        <Heading className="text-left">{text.heading}</Heading>
        <Subheading className="text-left text-neutral-400">
      {text.subheading}
        </Subheading>

        <div className="text-sm mt-10">
          <p className="text-sm text-neutral-200">Email</p>
          <p className="text-sm text-neutral-400">
            argonautedigital.tim@gmail.com
          </p>
        </div>
        <div className="text-sm mt-4">
          <p className="text-sm text-neutral-200">{text.phone}</p>
          <p className="text-sm text-neutral-400">+216 58 900 309</p>
        </div>
      </div>
      <form
        action="https://formspree.io/f/mgveanvn"
        method="POST"
        className="flex flex-col items-start gap-4 max-w-2xl w-full mx-auto bg-gradient-to-b from-neutral-900 to-neutral-950 p-10 rounded-3xl relative overflow-hidden"
      >
        <Grid size={20} />
        <div className="mb-4 w-full relative z-20">
          <label
            className="text-neutral-300 text-sm font-medium mb-2 inline-block"
            htmlFor="name"
          >
            {text.name}
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder={text.namePlaceholder}
            required
            className="h-10 pl-4 w-full rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>
        <div className="mb-4 w-full relative z-20">
          <label
            className="text-neutral-300 text-sm font-medium mb-2 inline-block"
            htmlFor="email"
          >
            {text.email}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder={text.emailPlaceholder}
            required
            className="h-10 pl-4 w-full rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>
        <div className="mb-4 w-full relative z-20">
          <label
            className="text-neutral-300 text-sm font-medium mb-2 inline-block"
            htmlFor="company"
          >
            {text.company}
          </label>
          <input
            id="company"
            type="text"
            name="company"
            placeholder={text.companyPlaceholder}
            className="h-10 pl-4 w-full rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>
        <div className="mb-4 w-full relative z-20">
          <label
            className="text-neutral-300 text-sm font-medium mb-2 inline-block"
            htmlFor="message"
          >
           {text.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={text.messagePlaceholder}
            required
            className="pl-4 pt-4 w-full rounded-md text-sm bg-charcoal border border-neutral-800 text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>
        <Button type="submit" variant="muted">
        {text.button}
        </Button>
      </form>
    </Container>
  );
};
