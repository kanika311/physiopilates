import mongoose, { Schema, models, model } from "mongoose";

const ArticleBlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["paragraph", "heading", "subheading"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const BlogSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    dateDisplay: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    heroImage: {
      type: String,
      required: true,
    },
    cardImage: {
      type: String,
    },
    sections: [ArticleBlockSchema],
  },
  {
    timestamps: true,
  }
);

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;