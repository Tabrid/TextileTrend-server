import express from "express";
import {
  getCategories,
  getCategoryStatusTrue,
  addCategory,
  updateCategory,
  deleteCategory,
  updateCategoryStatus
} from "../controllers/categoryController.js";

const router = express.Router();

// Get all categories
router.get("/", getCategories);

// Get categories with status true
router.get("/status/true", getCategoryStatusTrue);

// Add a new category
router.post("/", addCategory);

// Update a category
router.put("/:id", updateCategory);

// Delete a category
router.delete("/:id", deleteCategory);
router.patch("/:id/status", updateCategoryStatus);

export default router;
