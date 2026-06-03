import mongoose, {
  Schema,
  models,
  model,
  Document,
} from "mongoose";

export interface IContact
  extends Document {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  createdAt: Date;
}

const ContactSchema =
  new Schema<IContact>(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
      },

      service: {
        type: String,
      },

      message: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Contact =
  models.Contact ||
  model<IContact>(
    "Contact",
    ContactSchema
  );

export default Contact;