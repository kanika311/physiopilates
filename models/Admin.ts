import mongoose, {
  Schema,
  models,
  model,
  Document,
} from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
  role: string;
  resetTokenHash?: string | null;
  resetTokenExpiry?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "admin",
    },

    resetTokenHash: {
      type: String,
      default: null,
    },

    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Admin =
  models.Admin ||
  model<IAdmin>(
    "Admin",
    AdminSchema
  );

export default Admin;