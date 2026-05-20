import ServiceGallerySlider from "@/components/ServiceGallerySlider";



/** Physiotherapy-specific images (distinct from Pilates slider) */

const PHYSIO_SLIDES = [

  {

    src: "/phy2.jpg",

    alt: "Physiotherapy rehabilitation exercise session",

  },

  {

    src: "/phy3.jpg",

    alt: "Therapeutic mobility and stretching with physiotherapist",

  },

  {

    src: "/phy4.jpg",

    alt: "Clinical physiotherapy treatment and guided movement",

  },

  {

    src: "/phy5.jpg",

    alt: "Recovery-focused physiotherapy in the studio",

  },

  {

    src: "/phy6.jpg",

    alt: "Leg and knee rehabilitation session",

  },

] as const;



export default function PhysiotherapyGallerySection() {

  return (

    <ServiceGallerySlider

      id="physio-gallery"

      headingId="physio-gallery-heading"

      title="Physiotherapy Gallery"

      slides={PHYSIO_SLIDES}

      sectionClassName="bg-white"

      autoplayMs={5500}

    />

  );

}

