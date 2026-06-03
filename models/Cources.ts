import mongoose, {
  Schema,
  models,
  model,
  Document,
} from "mongoose";

export interface ICourse
  extends Document {
  title: string;
  slug: string;
  description: string;
  image: string;
  duration: string;
  price: string;
  level: string;
  instructor: string;
  category: string;
}

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    instructor: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course =
  models.Course ||
  model<ICourse>(
    "Course",
    CourseSchema
  );

export default Course;