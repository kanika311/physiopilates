import type { Metadata } from "next";

import Footer from "@/components/Footer";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import Navbar from "@/components/Navbar";
import DynamicPageHero from "@/components/common/DynamicPageHero";
import {
  termsOfServiceMeta,
  termsOfServiceSections,
} from "@/lib/legal/terms-of-service";

export const metadata: Metadata = {
  title: termsOfServiceMeta.title,
  description: termsOfServiceMeta.description,
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <DynamicPageHero page="terms" />
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
