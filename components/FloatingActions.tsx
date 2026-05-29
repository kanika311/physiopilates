"use client";

import { RiWhatsappLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

import { contactWhatsAppHrefWithText } from "@/lib/contact";
import { whatsappPrefillForPath } from "@/lib/whatsappPrefill";
import { brand } from "@/lib/brand";

export default function FloatingActions() {
  const pathname = usePathname() ?? "/";
  const waHref = contactWhatsAppHrefWithText(whatsappPrefillForPath(pathname));

  return (
    <div className="pointer-events-none fixed bottom-[max(0.875rem,env(safe-area-inset-bottom,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))] z-[95] md:bottom-10 md:right-8">
      <div className="pointer-events-auto">
        <a
          href={waHref}
          className="ripple-parent mi-hover flex size-14 items-center justify-center rounded-full text-white shadow-lg transition-colors hover:opacity-92 sm:size-[3.75rem]"
          style={{ backgroundColor: brand.whatsapp }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <RiWhatsappLine className="mi-svg size-[1.75rem] sm:size-8" aria-hidden />
        </a>
      </div>
    </div>
  );
}
