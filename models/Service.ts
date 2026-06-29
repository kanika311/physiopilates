import mongoose, { Schema, models, model } from "mongoose";

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },

    gallery: {
      type: [String],
      default: [],
    },

    // Hero banner (top of the public service page)
    heroEyebrow: {
      type: String,
      default: "",
    },
    heroTitle: {
      type: String,
      default: "",
    },
    heroDescription: {
      type: String,
      default: "",
    },
    heroImage: {
      type: String,
      default: "",
    },

    // Overview section (below the banner)
    overviewTitle: {
      type: String,
      default: "",
    },
    overviewDescription: {
      type: String,
      default: "",
    },
    overviewImage: {
      type: String,
      default: "",
    },
    overviewBullets: {
      type: [String],
      default: [],
    },
    overviewLevels: {
      type: [String],
      default: [],
    },

    order: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: Boolean,
      default: true,
    },

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    seoKeywords: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Service || model("Service", ServiceSchema);