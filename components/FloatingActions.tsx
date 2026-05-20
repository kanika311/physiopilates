"use client";

import { FiPhone } from "react-icons/fi";
import { RiWhatsappLine } from "react-icons/ri";
import { brand } from "@/lib/brand";

export default function FloatingActions() {
  return (
    <div className="pointer-events-none fixed bottom-8 right-4 z-[110] md:bottom-10 md:right-8">
      <div className="pointer-events-auto flex flex-col gap-3">
        <a
          href="https://wa.me/919717505326"
          className="flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: brand.whatsapp }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiWhatsappLine className="text-xl" aria-hidden />
          Chat Us
        </a>
        <a
          href="tel:+919717505326"
          className="flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: brand.gold }}
        >
          <FiPhone className="text-lg" aria-hidden />
          Call Now
        </a>
      </div>
    </div>
  );
}
