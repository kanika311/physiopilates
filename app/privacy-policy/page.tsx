import type { Metadata } from "next";

import Footer from "@/components/Footer";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import Navbar from "@/components/Navbar";
import DynamicPageHero from "@/components/common/DynamicPageHero";
import {
  privacyPolicyMeta,
  privacyPolicySections,
} from "@/lib/legal/privacy-policy";

export const metadata: Metadata = {
  title: privacyPolicyMeta.title,
  description: privacyPolicyMeta.description,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <DynamicPageHero page="privacy" />
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
