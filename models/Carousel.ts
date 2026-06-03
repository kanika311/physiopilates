import mongoose, {
  Schema,
  Model,
} from "mongoose";

export interface CarouselDocument {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  status: boolean;
}

const CarouselSchema =
  new Schema<CarouselDocument>(
    {
      title: String,
      subtitle: String,
      image: String,
      buttonText: String,
      buttonLink: String,
      order: Number,
      status: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Carousel: Model<CarouselDocument> =
  mongoose.models.Carousel ||
  mongoose.model(
    "Carousel",
    CarouselSchema
  );

export default Carousel;