import Category from "../models/category.js";
import slugify from "slugify";
import News from "../models/News.js";
// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Get categories with status true
export const getCategoryStatusTrue = async (req, res) => {
  try {
    const categories = await Category.find({ status: true });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enabled categories", error });
  }
};

// Add a new category
export const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    // Generate slug from name
    const slug = slugify(name, { lower: true, strict: true });

    // Check if slug already exists in the database
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({ message: "Category with this name already exists." });
    }
    // Create a new category
    const category = new Category({ name, slug });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error });
  }
};

// Update a category (name or status)
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name} = req.body;

  try {
    const slug = slugify(name, { lower: true, strict: true });

    // Retrieve the category to get the old slug
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const oldSlug = category.slug;

    // Check if the new slug already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory && existingCategory.id !== id) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists." });
    }

    // Update the category
    category.name = name;
    category.slug = slug;
    await category.save();

    // Update all news items with the old slug
    await News.updateMany(
      { category: oldSlug },
      { category: slug }
    );

    res.status(200).json({ message: "Category and related news updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};
// Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};


export const updateCategoryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Find the category by ID and update its status
    const category = await Category.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    console.log(category);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category status updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error updating category status", error });
  }
};