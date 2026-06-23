import type { LegalSection } from "@/components/legal/LegalDocumentPage";
import {
  contactAddressPlain,
  contactEmailDisplay,
  contactPhoneDisplay,
} from "@/lib/contact";

export const privacyPolicyMeta = {
  title: "Privacy Policy",
  description:
    "How Physio Pilates collects, uses, and protects your personal information when you visit our website or book services.",
  lastUpdated: "June 18, 2026",
  intro:
    "Physio Pilates (“we”, “us”, “our”) respects your privacy. This policy explains what information we collect, how we use it, and the choices you have when you use our website or wellness services in Delhi NCR.",
};

export const privacyPolicySections: LegalSection[] = [
  {
    title: "Information We Collect",
    paragraphs: [
      "We may collect personal information you provide directly, such as your name, phone number, email address, service preferences, and messages submitted through our contact form or WhatsApp.",
      "When you book appointments or enquire about physiotherapy, Pilates, yoga, therapy, or courses, we may also collect health-related details you choose to share so we can recommend appropriate care.",
      "We automatically collect limited technical data when you browse our website, including device type, browser, pages visited, and approximate location derived from IP address.",
    ],
  },
  {
    title: "How We Use Your Information",
    paragraphs: [
      "We use your information to respond to enquiries, schedule and manage appointments, deliver our services, and improve your experience at our studio.",
      "With your consent or as permitted by law, we may send service updates, appointment reminders, or wellness-related communications.",
      "We analyse aggregated website usage to improve site performance, security, and content relevance.",
    ],
  },
  {
    title: "Sharing of Information",
    paragraphs: [
      "We do not sell your personal information. We may share data with trusted service providers who assist us with hosting, email, analytics, payment processing, or appointment management, subject to confidentiality obligations.",
      "We may disclose information if required by law, court order, or to protect the rights, safety, and property of Physio Pilates, our clients, or others.",
    ],
  },
  {
    title: "Data Security & Retention",
    paragraphs: [
      "We implement reasonable administrative and technical safeguards to protect your information. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
      "We retain personal information only as long as necessary to fulfil the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.",
    ],
  },
  {
    title: "Your Rights",
    paragraphs: [
      "Depending on applicable law, you may request access to, correction of, or deletion of your personal information, or withdraw consent for certain processing activities.",
      "To exercise these rights, contact us using the details below. We will respond within a reasonable timeframe.",
    ],
  },
  {
    title: "Cookies & Third-Party Links",
    paragraphs: [
      "Our website may use cookies and similar technologies to remember preferences and understand how visitors use the site. You can control cookies through your browser settings.",
      "Our website may contain links to third-party platforms such as social media or maps. We are not responsible for the privacy practices of those external sites.",
    ],
  },
  {
    title: "Contact Us",
    paragraphs: [
      `If you have questions about this Privacy Policy, contact Physio Pilates at ${contactEmailDisplay}, ${contactPhoneDisplay}, or visit us at ${contactAddressPlain}.`,
    ],
  },
];
