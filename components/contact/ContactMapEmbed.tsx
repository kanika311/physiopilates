import Link from "next/link";

import { brand } from "@/lib/brand";
import { googleMapsEmbedSrc, googleMapsExternalUrl } from "@/lib/contact";

/** Interactive Google Maps embed (iframe) — not a static image. */

export default function ContactMapEmbed() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 md:pb-28" aria-label="Physio Pilates on the map">
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 shadow-[0_24px_50px_-32px_rgba(0,0,0,0.25)]">
        <iframe
          title="Physio Pilates — Google Maps location"
          src={googleMapsEmbedSrc}
          className="aspect-[21/11] min-h-[280px] w-full border-0 sm:min-h-[360px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
     
    </section>
  );
}
