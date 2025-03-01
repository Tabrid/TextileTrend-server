import express from "express";
import multer from "multer";
import {
  getPublications,
  addPublication,
  updatePublicationStatus,
  deletePublication,
  getPublicationBySlug
} from "../controllers/publicationController.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Get all publications
router.get("/", getPublications);

// Add a new publication
router.post("/", upload.single("frontpage"), addPublication);

// Update publication status
router.put("/status", updatePublicationStatus);

// Delete a publication
router.delete("/:id", deletePublication);

router.get("/publications/:slug", getPublicationBySlug);

export default router;
