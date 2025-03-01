import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  status: { type: Boolean, default: true }, // true = enabled, false = disabled
  link: { type: String, required: true },
});

const BannerSchema = new mongoose.Schema({
  part: { type: Number, required: true }, // Part number (1-8)
  images: [ImageSchema], // Array of images
});

export default mongoose.model("Banner", BannerSchema);
