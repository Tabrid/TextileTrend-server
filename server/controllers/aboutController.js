import About from '../models/AboutModel.js';

// Get the "About" page content
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About page content not found" });
    }
    res.status(200).json({ content: about.content });
  } catch (error) {
    console.error("Error fetching About page:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update the "About" page content
export const updateAbout = async (req, res) => {
  try {
    const { content } = req.body;

    let about = await About.findOne();
    if (!about) {
      about = new About({ content }); // Create a new About page if not found
    } else {
      about.content = content; // Update the existing About page content
    }

    await about.save();
    res.status(200).json({ message: "About page updated successfully" });
  } catch (error) {
    console.error("Error updating About page:", error);
    res.status(500).json({ message: "Server error" });
  }
};
