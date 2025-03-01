import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    frontpage: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true, // true = enabled, false = disabled
    },
  },
  { timestamps: true }
);

export default mongoose.model("Publication", PublicationSchema);
