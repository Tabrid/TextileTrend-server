import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String, 
      required: true,
    },
    categoryOrder: {
      type: Number, 
      default: 0,
    },
    type: {
      type: String, 
      required: true,
    },
    typeOrder: {
      type: Number, 
      default: 0,
    },
    coverImage: {
      type: String, 
      required: true,
    },
    description: {
      type: String, 
      required: true,
    },
    status: {
      type: Boolean,
      default: true, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("News", NewsSchema);
