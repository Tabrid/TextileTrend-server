import Banner from "../models/Banner.js";

// Get banners
export const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: "Error fetching banners", error });
    }
};

// Add image to a banner part
export const addImageToPart = async (req, res) => {
  const { part, link, status = true } = req.body; // Extract `link` and `status` from the request body
  const filePath = req.file ? req.file.path : null; // Get the uploaded file's path
  // Validate the inputs
  if (!part) {
      return res.status(400).json({ message: "Part is required" });
  }
  if (!filePath) {
      return res.status(400).json({ message: "Image is required" });
  }
  if (!link) {
      return res.status(400).json({ message: "Link is required" });
  }
  try {
      // Update or insert the banner part and add the new image
      const banner = await Banner.findOneAndUpdate(
          { part },
          {
              $push: {
                  images: {
                      url: filePath,
                      status,
                      link,
                  },
              },
          },
          { upsert: true, new: true }
      );

      // Respond with the updated banner
      res.status(201).json(banner);
  } catch (error) {
      // Handle errors and respond with a message
      res.status(500).json({
          message: "Error adding image to part",
          error: error.message,
      });
  }
};


// Update image status
export const updateImageStatus = async (req, res) => {
    const { part, imageId, status } = req.body;
    try {
      const banner = await Banner.findOneAndUpdate(
        { part, "images._id": imageId },
        { $set: { "images.$.status": status } }, // Update the specific image's status
        { new: true }
      );
      if (!banner) {
        return res.status(404).json({ message: "Banner part not found" });
      }
      res.status(200).json(banner);
    } catch (error) {
      res.status(500).json({ message: "Error updating image status", error });
    }
  };
  
  // Delete image from part
  export const deleteImageFromPart = async (req, res) => {
    const { part, imageId } = req.params;
    try {
      const banner = await Banner.findOneAndUpdate(
        { part },
        { $pull: { images: { _id: imageId } } }, // Remove the image from the images array
        { new: true }
      );
      if (!banner) {
        return res.status(404).json({ message: "Banner part not found" });
      }
      res.status(200).json(banner);
    } catch (error) {
      res.status(500).json({ message: "Error deleting image", error });
    }
  };
  

  export const getBannersFrontend = async (req, res) => { 
    try {
        const banners = await Banner.find().lean();

        // Filter images where status is true
        const filteredBanners = banners.map(banner => ({
            ...banner,
            images: banner.images.filter(image => image.status === true)
        }));

        res.status(200).json(filteredBanners);
    } catch (error) {
        res.status(500).json({ message: "Error fetching banners", error });
    }
};


export const updateImageToPart = async (req, res) => {
  const { part, imageId } = req.body; // Extract part and imageId from the request body
  const { link, status } = req.body; // New fields to update (link and status)
  const filePath = req.file ? req.file.path : null; // Optional new image file

  // Validate the inputs
  if (!part) {
      return res.status(400).json({ message: "Part is required" });
  }
  if (!imageId) {
      return res.status(400).json({ message: "Image ID is required" });
  }

  try {
      // Build the update object dynamically
      const updateData = {};
      if (filePath) updateData["images.$.url"] = filePath;
      if (link) updateData["images.$.link"] = link;
      if (typeof status === "boolean") updateData["images.$.status"] = status;

      // Update the specific image in the part
      const banner = await Banner.findOneAndUpdate(
          { part, "images._id": imageId }, // Find the specific image by ID
          { $set: updateData }, // Update the specific image's fields
          { new: true } // Return the updated document
      );

      if (!banner) {
          return res.status(404).json({ message: "Image or part not found" });
      }

      res.status(200).json(banner);
  } catch (error) {
      res.status(500).json({
          message: "Error updating image in part",
          error: error.message,
      });
  }
};
