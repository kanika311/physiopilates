import type { LegalSection } from "@/components/legal/LegalDocumentPage";
import {
  contactAddressPlain,
  contactEmailDisplay,
  contactPhoneDisplay,
} from "@/lib/contact";

export const termsOfServiceMeta = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using the Physio Pilates website and booking physiotherapy, Pilates, and wellness services.",
  lastUpdated: "June 18, 2026",
  intro:
    "These Terms of Service govern your use of the Physio Pilates website and your relationship with us when booking or receiving physiotherapy, Pilates, yoga, therapy, or training services at our Delhi NCR studio.",
};

export const termsOfServiceSections: LegalSection[] = [
  {
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing our website, contacting us, or booking a session, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.",
      "We may update these terms from time to time. Continued use of our website or services after changes are posted constitutes acceptance of the revised terms.",
    ],
  },
  {
    title: "Services",
    paragraphs: [
      "Physio Pilates provides physiotherapy, Pilates, yoga, manual therapy, rehabilitation, and related wellness and training programs. Service descriptions on our website are for general information and may be updated without notice.",
      "All treatments and movement sessions are subject to professional assessment. We reserve the right to decline or modify services where clinically or safely appropriate.",
    ],
  },
  {
    title: "Appointments & Cancellations",
    paragraphs: [
      "Appointments may be booked via our website, phone, email, or WhatsApp. You agree to provide accurate contact and health information where requested.",
      "Please provide reasonable notice if you need to reschedule or cancel. Repeated late cancellations or no-shows may result in restrictions on future bookings or applicable fees, as communicated at the time of booking.",
    ],
  },
  {
    title: "Health & Safety",
    paragraphs: [
      "You are responsible for disclosing relevant medical history, injuries, pregnancies, medications, or conditions before sessions. Our practitioners rely on this information to deliver safe care.",
      "Wellness and rehabilitation outcomes vary between individuals. Information on our website is not a substitute for personalised medical advice. Seek emergency care for urgent medical conditions.",
    ],
  },
  {
    title: "Fees & Payments",
    paragraphs: [
      "Session fees, course fees, and package pricing are communicated at booking or on official Physio Pilates materials. Prices may change, but confirmed bookings will honour the agreed rate unless otherwise stated.",
      "Payments must be made according to the method and timeline specified for your service or program.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "All content on this website—including text, images, logos, videos, and design—is owned by or licensed to Physio Pilates and may not be copied, reproduced, or distributed without written permission.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law, Physio Pilates is not liable for indirect, incidental, or consequential damages arising from use of our website or services.",
      "Our total liability for any claim relating to our services is limited to the amount you paid for the specific service giving rise to the claim, except where applicable law requires otherwise.",
    ],
  },
  {
    title: "Governing Law",
    paragraphs: [
      "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi, unless otherwise required by applicable consumer protection law.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      `For questions about these Terms of Service, contact Physio Pilates at ${contactEmailDisplay}, ${contactPhoneDisplay}, or ${contactAddressPlain}.`,
    ],
  },
];
