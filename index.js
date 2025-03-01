import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./server/routes/auth.routes.js";
import connectDB from "./server/DB/databaseConfigs.js";
import { uploadSingle } from "./server/middleware/uploadSingle.js";
import categoryRoutes from './server/routes/categoryRoutes.js';
import typeRoutes from "./server/routes/typeRoutes.js";
import bannerRoutes from "./server/routes/bannerRoutes.js";
import publicationRoutes from "./server/routes/publicationRoutes.js";
import newsRoutes from "./server/routes/newsRoutes.js";
import uploadRoutes from "./server/routes/uploadRoutes.js";
import subscriberRoutes from "./server/routes/subscriberRoutes.js";
import privacyPolicyRoutes from "./server/routes/privacyPolicyRoutes.js";
import aboutRoutes from "./server/routes/aboutRoutes.js";
import contactRoutes from "./server/routes/contactRoutes.js";
const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/banners",bannerRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscriberRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/privacy-policy", privacyPolicyRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contacts", contactRoutes);
app.post('/upload', uploadSingle, (req, res) => {
  res.json({ file: req.file ? req.file.path : null });
});

app.get("/", (req, res) => {
  res.send("Hello to online API");
});
app.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
