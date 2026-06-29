import { Schema, models, model } from "mongoose";

const FooterLinkSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
  },
  { _id: false }
);

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
    servicesHeading: { type: String },
    companyHeading: { type: String },
    contactHeading: { type: String },
    companyLinks: { type: [FooterLinkSchema], default: undefined },
  },
  { timestamps: true }
);

const FooterSettings =
  models.FooterSettings || model("FooterSettings", FooterSettingsSchema);

export default FooterSettings;
