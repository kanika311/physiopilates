import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Montserrat, Playfair_Display } from "next/font/google";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MotionProviders from "@/components/providers/MotionProviders";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Physio Pilates",
    default: "Physio Pilates | Physiotherapy & Pilates Delhi NCR",
  },
  description:
    "PhysioPilates — the only centre in Delhi NCR that provides a unique combination of physiotherapy and pilates for treatment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} scroll-smooth`} suppressHydrationWarning>
      <body
        className={`${montserrat.className} ${playfair.variable} flex min-h-dvh min-w-0 flex-col bg-white antialiased transition-colors duration-200 dark:bg-[#0f172a] dark:text-white`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-w-0 flex-1">
            <MotionProviders>{children}</MotionProviders>
          </main>
          <Footer />
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
