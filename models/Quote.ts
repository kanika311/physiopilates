import { Schema, models, model, Document } from "mongoose";

export interface IQuote extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate?: string;
  message?: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
}

const QuoteSchema = new Schema<IQuote>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    preferredDate: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Quote = models.Quote || model<IQuote>("Quote", QuoteSchema);

export default Quote;
