/**
 * GALLERY CATEGORY TYPE
 */
export type GalleryCategoryId =
  | "physiotherapy"
  | "pilates"
  | "yoga"
  | "therapy"
  | string;

/**
 * GALLERY IMAGE TYPE
 */
export type GalleryImageItem = {
  /**
   * DATABASE ID
   */
  _id?: string;

  /**
   * TITLE
   */
  title?: string;

  /**
   * IMAGE URL OR BASE64
   */
  src: string;

  /**
   * ALT TEXT
   */
  alt: string;

  /**
   * CATEGORY ARRAY
   */
  categories: GalleryCategoryId[];

  /**
   * BADGE
   */
  badge?: string;
};

/**
 * FETCH GALLERY API
 */
export async function getGalleryImages(): Promise<
  GalleryImageItem[]
> {
  try {
    /**
     * API CALL
     */
    const response = await fetch(
      "/api/admin/gallary",
      {
        method: "GET",
        cache: "no-store",
      }
    );

    /**
     * RESPONSE JSON
     */
    const result =
      await response.json();

    /**
     * SUCCESS
     */
    if (result.success) {
      /**
       * FORMAT DATABASE DATA — ONLY ACTIVE ITEMS RENDER ON THE WEBSITE
       */
      return result.data
        .filter((item: any) => item.isActive !== false)
        .map(
        (item: any) => ({
          /**
           * DATABASE ID
           */
          _id: item._id,

          /**
           * TITLE
           */
          title:
            item.title || "",

          /**
           * IMAGE
           */
          src: item.image,

          /**
           * ALT
           */
          alt:
            item.alt ||
            "Gallery Image",

          /**
           * CATEGORY
           */
          categories:
            item.categories ||
            [],

          /**
           * BADGE
           */
          badge:
            item.badge || "",
        })
      );
    }

    return [];
  } catch (error) {
    console.log(
      "Gallery API Error:",
      error
    );

    return [];
  }
}