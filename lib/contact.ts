/** Physio Pilates — shared contact strings (footer, contact page, structured data). */

export const contactAddressPlain =
  "LGF Left side, D–768, opp. market no-2, Block D, Chittaranjan Park, New Delhi 110019";

export const contactPhoneDisplay = "+91 9717505326";
export const contactPhoneHref = "+919717505326";

/** Opens WhatsApp chat with clinic number (FAB + hero shortcuts). */
export const contactWhatsAppUrl = `https://wa.me/${contactPhoneHref.replace(/\D/g, "")}`;

/** Same URL with optional pre-filled message query (design unchanged). */
export function contactWhatsAppHrefWithText(message?: string): string {
  const t = message?.trim();
  if (!t) return contactWhatsAppUrl;
  return `${contactWhatsAppUrl}?text=${encodeURIComponent(t)}`;
}

export const contactEmailDisplay = "physiopilates.12082022@gmail.com";
export const contactEmailHref = contactEmailDisplay;

/** Practo-listed coordinates (CR Park) — used for iframe + external Maps link only. */
export const contactMapLatitude = 28.537204976706658;
export const contactMapLongitude = 77.2531570494175;

/** Google Maps iframe (interactive, not a static image). */
export const googleMapsEmbedSrc = `https://maps.google.com/maps?q=${contactMapLatitude},${contactMapLongitude}&z=17&hl=en&output=embed&iwloc=near`;

/** Opens the same pin in Google Maps in a full browser/tab. */
export const googleMapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${contactMapLatitude},${contactMapLongitude}`;

export const openingHoursLines = [
  { label: "Mon – Fri", value: "10:00 AM – 1:30 PM · 6:30 PM – 9:30 PM" },
  { label: "Saturday", value: "10:00 AM – 9:30 PM" },
  { label: "Sunday", value: "Closed" },
];

export const contactServiceOptions = [
  { value: "", label: "Select a service" },
  { value: "Physiotherapy", label: "Physiotherapy" },
  { value: "Pilates", label: "Pilates" },
  { value: "Yoga", label: "Yoga" },
  { value: "Therapy", label: "Dry Needling / Cup Therapy" },
  { value: "Courses", label: "Courses" },
  { value: "Other", label: "Other / General inquiry" },
] as const;
