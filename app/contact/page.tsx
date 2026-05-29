import type { Metadata } from "next";

import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactHero from "@/components/contact/ContactHero";
import ContactInformationSection from "@/components/contact/ContactInformationSection";
import ContactMapEmbed from "@/components/contact/ContactMapEmbed";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Physio Pilates in Chittaranjan Park, New Delhi — physiotherapy, Pilates, yoga, and therapy.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="relative z-10 -mt-px bg-white px-4 pb-4 pt-14 dark:bg-[#0f172a] md:pt-16 lg:pb-8">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-x-14 lg:gap-y-16">
          <ContactInformationSection />
          <ContactFormSection />
        </div>
      </section>
      <ContactMapEmbed />
    </>
  );
}
