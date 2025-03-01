// models/Contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  emails: { type: [String], required: true },
  phones: { type: [String], required: true },
  address: { type: String, required: true },
  linkedin: { type: String, required: true },
  facebook: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
