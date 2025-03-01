import express from "express";
import multer from "multer";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"), // Set the uploads folder
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Unique filename
});
const upload = multer({ storage });

// Upload image route
router.post("/", upload.single("image"), (req, res) => {
  try {
    const filePath = req.file.path; // Path to the stored image
    const imageUrl = `https://server.textiletrend.net/${filePath}`; // Public URL for the image
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
});

export default router;
