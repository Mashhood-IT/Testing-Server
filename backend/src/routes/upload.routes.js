import 'dotenv/config'
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const r = Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Cloudinary storage for PDFs
const pdfStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products/pdf",
    allowed_formats: ["pdf"],
    resource_type: "raw",
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadPdf = multer({ storage: pdfStorage });

// Single image
r.post("/image", requireAuth, uploadImage.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded." });
  res.status(201).json({ url: req.file.path }); // Cloudinary URL
});

// Multiple images
r.post("/images", requireAuth, uploadImage.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0)
    return res.status(400).json({ error: "No images uploaded." });
  
  const urls = req.files.map((file) => file.path);
  res.status(201).json({ urls });
});

// PDF upload
r.post("/pdf", requireAuth, uploadPdf.single("pdf"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No PDF uploaded." });
  res.status(201).json({ url: req.file.path });
});

export default r;

