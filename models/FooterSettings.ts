import { Schema, models, model } from "mongoose";

const FooterSettingsSchema = new Schema(
  {
    key: { type: String, default: "default", unique: true },
    tagline: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    copyright: { type: String },
  },
  { timestamps: true }
);

const FooterSettings =
  models.FooterSettings || model("FooterSettings", FooterSettingsSchema);

export default FooterSettings;
