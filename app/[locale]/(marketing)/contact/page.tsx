import { ContactForm } from "@/components/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Argonaute Digital",
  description:
    "Let's talk about what you're building. Tell me about your project and I'll reply within one business day.",
  openGraph: {
    images: ["/banner.png"],
  },
};

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <div className="relative">
      <ContactForm locale={params.locale} />
    </div>
  );
}
