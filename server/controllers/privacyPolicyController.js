import PrivacyPolicy from '../models/PrivacyPolicyModel.js';

// Get the privacy policy
export const getPrivacyPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne();
    if (!policy) {
      return res.status(404).json({ message: "Privacy policy not found" });
    }
    res.status(200).json({ content: policy.content });
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update the privacy policy
export const updatePrivacyPolicy = async (req, res) => {
  try {
    const { content } = req.body;

    let policy = await PrivacyPolicy.findOne();
    if (!policy) {
      policy = new PrivacyPolicy({ content }); // Create a new policy if not found
    } else {
      policy.content = content; // Update existing policy
    }

    await policy.save();
    res.status(200).json({ message: "Privacy policy updated successfully" });
  } catch (error) {
    console.error("Error updating privacy policy:", error);
    res.status(500).json({ message: "Server error" });
  }
};
