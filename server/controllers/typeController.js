import Type from "../models/Type.js";
import slugify from "slugify"; 
// Get all types
export const getTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: "Error fetching types", error });
  }
};
// Get enabled types
export const getTypesStatusTrue = async (req, res) => {
  try {
    const types = await Type.find({ status: true });
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enabled types", error });
  }
};
// Add a new type
export const addType = async (req, res) => {
  const { name } = req.body;
  try {
    // Generate slug from name
    const slug = slugify(name, { lower: true, strict: true });

    // Check if slug already exists in the database
    const existingType = await Type.findOne({ slug });
    if (existingType) {
      return res.status(400).json({ message: "Type with this slug already exists." });
    }

    // Create a new type
    const type = new Type({ name, slug });
    await type.save();

    res.status(201).json(type);
  } catch (error) {
    res.status(500).json({ message: "Error adding type", error });
  }
}; 

// Update a type
export const updateType = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  try {
    const type = await Type.findByIdAndUpdate(id, { name, status }, { new: true });
    if (!type) return res.status(404).json({ message: "Type not found" });
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ message: "Error updating type", error });
  }
};

// Delete a type
export const deleteType = async (req, res) => {
  const { id } = req.params;
  try {
    const type = await Type.findByIdAndDelete(id);
    if (!type) return res.status(404).json({ message: "Type not found" });
    res.status(200).json({ message: "Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting type", error });
  }
};
