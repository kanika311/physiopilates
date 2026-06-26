import mongoose, { Schema, Document, Model } from "mongoose";

interface NavLink {
  label: string;
  href: string;
  pathnameMatch: string;
  type: "about" | "service" | "other";
}

export interface IHeaderSettings extends Document {
  siteLogo: string;
  headerBgColor: string;
  menuTextColor: string;
  menuHoverColor: string;
  activeMenuColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  navLinks: NavLink[];
}

const HeaderSettingsSchema = new Schema<IHeaderSettings>(
  {
    siteLogo: {
      type: String,
      default: "",
    },

    headerBgColor: {
      type: String,
      default: "#ffffff",
    },

    menuTextColor: {
      type: String,
      default: "#222222",
    },

    menuHoverColor: {
      type: String,
      default: "#c89b3c",
    },

    activeMenuColor: {
      type: String,
      default: "#c89b3c",
    },

    buttonBgColor: {
      type: String,
      default: "#c89b3c",
    },

    buttonTextColor: {
      type: String,
      default: "#ffffff",
    },

    navLinks: [
      {
        label: {
          type: String,
          required: true,
        },

        href: {
          type: String,
          required: true,
        },

        pathnameMatch: {
          type: String,
          required: true,
        },

        type: {
          type: String,
          enum: ["about", "service", "other"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const HeaderSettings: Model<IHeaderSettings> =
  mongoose.models.HeaderSettings ||
  mongoose.model<IHeaderSettings>(
    "HeaderSettings",
    HeaderSettingsSchema
  );

export default HeaderSettings;