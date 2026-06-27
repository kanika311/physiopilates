import { Schema, models, model, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role: string;
  quote: string;
  image?: string;
  rating: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial =
  models.Testimonial || model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
