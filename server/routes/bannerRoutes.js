import express from "express";
import multer from "multer";
import {
  getBanners,
  addImageToPart,
  updateImageStatus,
  deleteImageFromPart,
  getBannersFrontend,
  updateImageToPart
} from "../controllers/bannerController.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Get all banners
router.get("/", getBanners);
router.get("/frontend", getBannersFrontend);

// Add an image to a banner part
router.post("/", upload.single("image"), addImageToPart);
router.put("/banner/update-image", upload.single("image"), updateImageToPart);
// Toggle image status
router.put("/status", updateImageStatus);

// Delete an image
router.delete("/:part/:imageId", deleteImageFromPart);

export default router;
