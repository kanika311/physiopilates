import type { Metadata } from "next";

import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactHero from "@/components/contact/ContactHero";
import ContactInformationSection from "@/components/contact/ContactInformationSection";
import ContactMapEmbed from "@/components/contact/ContactMapEmbed";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Physio Pilates in Chittaranjan Park, New Delhi — physiotherapy, Pilates, yoga, and therapy.",
};

export default function ContactPage() {
  return (
    <>
    <Navbar/>
      <ContactHero />
      <section className="relative z-10 bg-white px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
          <ContactInformationSection />
          <ContactFormSection />
        </div>
      </section>
      <ContactMapEmbed />
      <Footer/>
    </>
  );
}
