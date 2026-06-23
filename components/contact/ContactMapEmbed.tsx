import Link from "next/link";

import { brand } from "@/lib/brand";
import { googleMapsEmbedSrc, googleMapsExternalUrl } from "@/lib/contact";

/** Interactive Google Maps embed (iframe) — not a static image. */

export default function ContactMapEmbed() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-2 sm:px-6 sm:pb-12" aria-label="Physio Pilates on the map">
      <div className="overflow-hidden rounded-[20px] border shadow-[var(--luxury-shadow)]" style={{ borderColor: brand.border }}>
        <iframe
          title="Physio Pilates — Google Maps location"
          src={googleMapsEmbedSrc}
          className="aspect-[21/9] min-h-[200px] w-full border-0 sm:min-h-[260px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
     
    </section>
  );
}
