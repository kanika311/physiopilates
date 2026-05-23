/** Short context line for WhatsApp deep link — same design, faster for users. */

const DEFAULT =
  "Hi Physio Pilates, I'd like to know more about your services and booking.";

const BY_PREFIX: { prefix: string; text: string }[] = [
  { prefix: "/physiotherapy", text: "Hi, I'm interested in physiotherapy at Physio Pilates." },
  { prefix: "/pilates", text: "Hi, I'm interested in Pilates sessions at Physio Pilates." },
  { prefix: "/yoga", text: "Hi, I'm interested in yoga sessions at Physio Pilates." },
  { prefix: "/therapy", text: "Hi, I'd like to know about dry needling / cup therapy at Physio Pilates." },
  { prefix: "/courses", text: "Hi, I'd like information about instructor courses at Physio Pilates." },
  { prefix: "/gallery", text: "Hi, I saw your gallery and would like to visit Physio Pilates." },
  { prefix: "/blogs", text: "Hi, I have a question about your blog / services." },
  { prefix: "/contact", text: "Hi, I'd like to get in touch with Physio Pilates." },
  { prefix: "/about", text: "Hi, I'd like to learn more about Physio Pilates." },
];

export function whatsappPrefillForPath(pathname: string): string {
  const path = pathname.split("?")[0] || "/";
  if (path === "/") return DEFAULT;
  const hit = BY_PREFIX.find((p) => path === p.prefix || path.startsWith(`${p.prefix}/`));
  return hit?.text ?? DEFAULT;
}
