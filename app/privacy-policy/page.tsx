import type { Metadata } from "next";

import Footer from "@/components/Footer";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import Navbar from "@/components/Navbar";
import ServicePageHero from "@/components/services/ServicePageHero";
import {
  privacyPolicyMeta,
  privacyPolicySections,
} from "@/lib/legal/privacy-policy";
import { HERO_CONTACT } from "@/lib/siteImages";

export const metadata: Metadata = {
  title: privacyPolicyMeta.title,
  description: privacyPolicyMeta.description,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <ServicePageHero
        id="privacy-policy-heading"
        image={HERO_CONTACT}
        imageAlt="Physio Pilates studio"
        eyebrow="Legal"
        title={privacyPolicyMeta.title}
        description="How we collect, use, and protect your personal information."
        minHeightClass="min-h-[max(380px,min(520px,55dvh))]"
      />
      <LegalDocumentPage
        title={privacyPolicyMeta.title}
        intro={privacyPolicyMeta.intro}
        lastUpdated={privacyPolicyMeta.lastUpdated}
        sections={privacyPolicySections}
      />
      <Footer />
    </>
  );
}
