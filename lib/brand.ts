/** Premium wellness design tokens */
export const brand = {
  primary: "#0F6D6D",
  primaryHover: "#0c5858",
  primaryMuted: "rgb(15 109 109 / 0.72)",
  navy: "#12344D",
  ink: "#111111",
  gold: "#D4B06A",
  goldMuted: "rgb(212 176 106 / 0.35)",
  white: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceMuted: "#F7FAFA",
  border: "rgb(18 52 77 / 0.08)",
  shadow: "0 8px 40px -12px rgb(15 109 109 / 0.12)",
  shadowHover: "0 16px 48px -16px rgb(15 109 109 / 0.18)",
  radius: "18px",
  radiusLg: "20px",
  /** Legacy aliases */
  sage: "#0F6D6D",
  sageMuted: "#0c5858",
  goldHeading: "#12344D",
  goldFooterBar: "#0F6D6D",
  goldButton: "#0F6D6D",
  goldHeadingWarm: "#0F6D6D",
  teal: "#0F6D6D",
  tealAccent: "#0F6D6D",
  tealIcon: "#0F6D6D",
  cream: "#FFFFFF",
  creamWarm: "#FFFFFF",
  canvas: "#FFFFFF",
  textBody: "#374151",
  textSubtitle: "#4B5563",
  textMuted: "#4B5563",
  textWarmGray: "rgb(18 52 77 / 0.55)",
  mintBg: "#F0F7F7",
  whatsapp: "#25D366",
} as const;

export type BrandTokens = typeof brand;

export const SERIF = 'var(--font-cormorant), "Georgia", serif';
export const SANS = 'var(--font-inter), ui-sans-serif, system-ui, sans-serif';
export const SECTION_MAX = "max-w-[1320px]";
