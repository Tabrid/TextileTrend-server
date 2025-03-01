// routes/contactRoutes.js
import express from "express";
import { updateContact, getContact } from "../controllers/contactController.js";

const router = express.Router();

// Get contact data
router.get("/", getContact);

// Update contact
router.put("/update", updateContact);

export default router;
