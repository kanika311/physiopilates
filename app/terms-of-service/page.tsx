import type { Metadata } from "next";

import Footer from "@/components/Footer";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import Navbar from "@/components/Navbar";
import ServicePageHero from "@/components/services/ServicePageHero";
import {
  termsOfServiceMeta,
  termsOfServiceSections,
} from "@/lib/legal/terms-of-service";
import { HERO_CONTACT } from "@/lib/siteImages";

export const metadata: Metadata = {
  title: termsOfServiceMeta.title,
  description: termsOfServiceMeta.description,
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <ServicePageHero
        id="terms-of-service-heading"
        image={HERO_CONTACT}
        imageAlt="Physio Pilates studio"
        eyebrow="Legal"
        title={termsOfServiceMeta.title}
        description="Terms and conditions for using our website and services."
        minHeightClass="min-h-[max(380px,min(520px,55dvh))]"
      />
      <LegalDocumentPage
        title={termsOfServiceMeta.title}
        intro={termsOfServiceMeta.intro}
        lastUpdated={termsOfServiceMeta.lastUpdated}
        sections={termsOfServiceSections}
      />
      <Footer />
    </>
  );
}
