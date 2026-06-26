import {
  Schema,
  models,
  model,
  Document,
} from "mongoose";

export interface IStudent extends Document {
  name: string;
  number: string;
  email: string;
  enrollmentNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    number: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    enrollmentNumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student =
  models.Student || model<IStudent>("Student", StudentSchema);

export default Student;
