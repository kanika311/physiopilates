import ServiceGallerySlider from "@/components/ServiceGallerySlider";



const PILATES_SLIDES = [

  {

    src: "/index2.jpg",

    alt: "Pilates reformer plank and core conditioning",

  },

  {

    src: "/index1.webp",

    alt: "Pilates small-group session on reformers",

  },

  {

    src: "/index3.webp",

    alt: "Pilates equipment session in studio",

  },

] as const;



/** Light canvas behind gallery per Pilates design mock */

export default function PilatesGallerySection() {

  return (

    <ServiceGallerySlider

      id="pilates-gallery"

      headingId="pilates-gallery-heading"

      title="Pilates Gallery"

      slides={PILATES_SLIDES}

      sectionClassName="bg-[#f8f9fa]"

      autoplayMs={5500}

    />

  );

}

