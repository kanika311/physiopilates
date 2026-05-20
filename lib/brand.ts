/** Physio Pilates design tokens — aligned across sections */
export const brand = {
  gold: "#c09e6b",
  goldHeading: "#b39359",
  goldFooterBar: "#b89b66",
  goldButton: "#c5a974",
  goldHeadingWarm: "#bfa16d",
  teal: "#48cfcb",
  tealAccent: "#56d8e4",
  tealIcon: "#4ecdc4",
  cream: "#fdfbf7",
  creamWarm: "#fdfbf6",
  canvas: "#fafafa",
  textBody: "#5c5c5c",
  textMuted: "#7a7a7a",
  textWarmGray: "#7a746e",
  mintBg: "#d1f7f1",
  whatsapp: "#25d366",
} as const;

export type BrandTokens = typeof brand;
