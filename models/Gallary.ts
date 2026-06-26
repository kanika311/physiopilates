import mongoose, {
  Schema,
  models,
  model,
  Document,
} from "mongoose";

export type GalleryCategoryId =
  | "physiotherapy"
  | "pilates"
  | "yoga"
  | "therapy";

export interface IGallery
  extends Document {
  title: string;
  image: string;
  alt: string;
  categories: GalleryCategoryId[];
  badge?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema =
  new Schema<IGallery>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      image: {
        type: String,
        required: true,
      },

      alt: {
        type: String,
        required: true,
      },

      categories: [
        {
          type: String,
          enum: [
            "physiotherapy",
            "pilates",
            "yoga",
            "therapy",
          ],
        },
      ],

      badge: {
        type: String,
        default: "",
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Gallery =
  models.Gallery ||
  model<IGallery>(
    "Gallery",
    GallerySchema
  );

export default Gallery;