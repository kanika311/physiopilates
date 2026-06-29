import { Schema, models, model } from "mongoose";

const OpeningHourSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const ContactSettingsSchema = new Schema(
  {
    key: { type: String, default: "default", unique: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    openingHours: { type: [OpeningHourSchema], default: undefined },
  },
  { timestamps: true }
);

const ContactSettings =
  models.ContactSettings || model("ContactSettings", ContactSettingsSchema);

export default ContactSettings;
