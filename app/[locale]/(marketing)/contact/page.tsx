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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  return (
    <div className="relative">
      <ContactForm locale={resolvedParams.locale} />
    </div>
  );
}
