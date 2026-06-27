import { Schema, models, model } from "mongoose";

const PageContentSchema = new Schema(
  {
    page: { type: String, required: true, unique: true },
    eyebrow: { type: String },
    title: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const PageContent =
  models.PageContent || model("PageContent", PageContentSchema);

export default PageContent;
