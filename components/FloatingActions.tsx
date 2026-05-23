"use client";

import { FiPhone } from "react-icons/fi";
import { RiWhatsappLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { contactPhoneHref, contactWhatsAppHrefWithText } from "@/lib/contact";
import { whatsappPrefillForPath } from "@/lib/whatsappPrefill";
import { brand } from "@/lib/brand";

export default function FloatingActions() {
  const pathname = usePathname() ?? "/";
  const waHref = contactWhatsAppHrefWithText(whatsappPrefillForPath(pathname));

  return (
    <div className="pointer-events-none fixed bottom-[max(0.875rem,env(safe-area-inset-bottom,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))] z-[95] md:bottom-10 md:right-8">
      <div className="pointer-events-auto flex max-w-[100vw] flex-col gap-2 sm:gap-3">
        <a
          href={waHref}
          className="flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] sm:px-7 sm:py-3.5 sm:text-sm"
          style={{ backgroundColor: brand.whatsapp }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiWhatsappLine className="size-[1.125rem] sm:text-xl" aria-hidden />
          <span className="whitespace-nowrap">Chat Us</span>
        </a>
        <a
          href={`tel:${contactPhoneHref}`}
          className="flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] sm:px-7 sm:py-3.5 sm:text-sm"
          style={{ backgroundColor: brand.gold }}
        >
          <FiPhone className="size-[1.0625rem] sm:text-lg" aria-hidden />
          <span className="whitespace-nowrap">Call Now</span>
        </a>
      </div>
    </div>
  );
}
