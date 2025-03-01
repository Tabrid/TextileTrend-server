import express from "express";
import {
  getTypes,
  getTypesStatusTrue,
  addType,
  updateType,
  deleteType,
} from "../controllers/typeController.js";

const router = express.Router();

// Get all types
router.get("/", getTypes);

// Get enabled types
router.get("/status/true", getTypesStatusTrue);

// Add a new type
router.post("/", addType);

// Update a type
router.put("/:id", updateType);

// Delete a type
router.delete("/:id", deleteType);

export default router;
