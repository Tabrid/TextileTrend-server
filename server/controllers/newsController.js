import News from "../models/News.js";
import slugify from "slugify";

// Get all news
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};
// Add news
export const addNews = async (req, res) => {
  const { title, category, type, description ,shortDescription ,creator} = req.body;
  const coverImage = req.file ? req.file.path : null;
  if (!coverImage) {
    return res.status(400).json({ message: "Cover image is required" });
  }
  try {
    // Generate slug from plain text title
    const slug = slugify(title, { lower: true, strict: true });
    // Check if slug already exists
    const existingNews = await News.findOne({ slug });
    if (existingNews) {
      return res.status(400).json({ message: "News with this title already exists." });
    }
    const news = new News({ title, slug, category, type, coverImage, description ,shortDescription, creator });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error adding news", error });
  }
};

// Delete news
export const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "News deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};

export const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, category, type, description, status ,shortDescription ,creator } = req.body;
  const coverImage = req.file ? req.file.path : undefined;
  try {
    // Generate slug from plain text title
    const slug = slugify(title, { lower: true, strict: true });
    const updatedData = { title, category, type,slug, description, status ,shortDescription ,creator };

    if (coverImage) updatedData.coverImage = coverImage;

    const news = await News.findByIdAndUpdate(id, updatedData, { new: true });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error updating news", error });
  }
};

export const getNewsByCategory = async (req, res) => {
  const { category } = req.params;

  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  try {
    const news = await News.find({ category, status: true }) // Only fetch active news
      .sort({ categoryOrder: 1, createdAt: -1 }) // Sort by categoryOrder first, then by latest news
      .exec();

    if (!news.length) {
      return res.status(404).json({ message: "No active news found for this category" });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news by category", error: error.message });
  }
};

export const getNewsByType = async (req, res) => {
  const { type } = req.params;

  if (!type) {
    return res.status(400).json({ message: "Type is required" });
  }

  try {
    const news = await News.find({ type, status: true }) // Only fetch active news
      .sort({ typeOrder: 1, createdAt: -1 }) // Sort by typeOrder first, then by latest news
      .exec();

    if (!news.length) {
      return res.status(404).json({ message: "No active news found for this type" });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news by type", error: error.message });
  }
};


export const getNewsBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const news = await News.findOne({ slug });
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news by slug", error });
  }
};

export const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title query parameter is required." });
    }

    // Perform a case-insensitive search for the title and only return active news
    const news = await News.find({ 
      title: { $regex: title, $options: "i" },
      status: true 
    });

    if (news.length === 0) {
      return res.status(404).json({ message: "No active news found with the given title." });
    }

    res.status(200).json({ success: true, data: news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while searching for news.", error });
  }
};



export const updateNewsOrder = async (req, res) => {
  try {
    const { news, istype, selectedType, selectedCategory } = req.body;
    const bulkOperations = news.map((item, index) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: {
            $set: istype ? { typeOrder: index } : { categoryOrder: index },
          },
        },
      };
    });

    await News.bulkWrite(bulkOperations);

    res.status(200).json({ message: "News order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating news order", error });
  }
};

export const getLatestNews = async (req, res) => {
  try {
    const news = await News.find({ status: true }) // Only fetch active news
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(6) // Get the latest 3 news
      .exec();

    if (news.length === 0) {
      return res.status(404).json({ message: "No active news found." });
    }

    res.status(200).json({ success: true, data: news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the latest news.", error });
  }
};
