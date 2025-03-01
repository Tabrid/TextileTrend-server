// controllers/contactController.js
import Contact from "../models/Contact.js";

export const updateContact = async (req, res) => {
    try {
      const { emails, phones, address, linkedin, facebook } = req.body;
  
      const updatedContact = await Contact.findOneAndUpdate(
        {}, // No filter; updates the only document
        { emails, phones, address, linkedin, facebook },
        { new: true, upsert: true } // `upsert` creates the document if it doesn't exist
      );
  
      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(500).json({ message: "Failed to update contact information", error });
    }
  };


export const getContact = async (req, res) => {
    try {
        const contact = await Contact.findOne(); // Fetch the first contact document
        if (!contact) {
            return res.status(404).json({ message: "No contact information found" });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve contact data", error });
    }
};