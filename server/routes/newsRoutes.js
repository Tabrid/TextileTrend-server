import express from "express";
import multer from "multer";
import {searchByTitle,updateNewsOrder,getLatestNews, getAllNews, addNews, deleteNews ,updateNews , getNewsBySlug , getNewsByCategory , getNewsByType} from "../controllers/newsController.js";

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Get all news
router.get("/", getAllNews);
router.get("/latest", getLatestNews);
router.get("/category/:category", getNewsByCategory);
router.get("/type/:type", getNewsByType);
router.get("/slug/:slug", getNewsBySlug);
router.get("/search", searchByTitle);
router.put("/update-order", updateNewsOrder);

// Add news
router.post("/", upload.single("coverImage"), addNews);

// Delete news
router.delete("/:id", deleteNews);
router.put("/:id", upload.single("coverImage"), updateNews);

export default router;
