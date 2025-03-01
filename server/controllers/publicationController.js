import Publication from "../models/Publication.js";
import slugify from "slugify";
// Get all publications
export const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find();
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching publications", error });
  }
};

// Add a new publication
export const addPublication = async (req, res) => {
  const { title, link } = req.body;
  const frontpage = req.file ? req.file.path : null;

  if (!frontpage) {
    return res.status(400).json({ message: "Frontpage image is required" });
  }
  const slug = slugify(title, { lower: true, strict: true });

  const existingNews = await Publication.findOne({ slug });
  if (existingNews) {
    return res.status(400).json({ message: "News with this title already exists." });
  }
  try {
    const publication = new Publication({ title, frontpage, link ,slug });
    await publication.save();
    res.status(201).json(publication);
  } catch (error) {
    res.status(500).json({ message: "Error adding publication", error });
  }
};

// Update publication status
export const updatePublicationStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const publication = await Publication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: "Error updating publication status", error });
  }
};

// Delete a publication
export const deletePublication = async (req, res) => {
  const { id } = req.params;

  try {
    const publication = await Publication.findByIdAndDelete(id);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    res.status(200).json({ message: "Publication deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting publication", error });
  }
};

export const getPublicationBySlug = async (req, res) => {
  try {
      const { slug } = req.params;

      // Find the publication by slug
      const publication = await Publication.findOne({ slug });

      if (!publication) {
          return res.status(404).json({ success: false, message: "Publication not found" });
      }

      // Respond with the publication data
      return res.status(200).json({ success: true, data: publication });
  } catch (error) {
      console.error("Error fetching publication by slug:", error);

      // Handle any errors
      return res.status(500).json({
          success: false,
          message: "An error occurred while fetching the publication",
          error: error.message,
      });
  }
};