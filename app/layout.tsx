import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MotionProviders from "@/components/providers/MotionProviders";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${inter.variable} ${cormorant.variable} scroll-smooth`} suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-dvh min-w-0 flex-col bg-white antialiased text-[#12344D]`}
      >
        <ThemeProvider>
         
          <main className="min-w-0 flex-1">
            <MotionProviders>{children}</MotionProviders>
          </main>
         
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
