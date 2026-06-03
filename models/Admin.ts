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