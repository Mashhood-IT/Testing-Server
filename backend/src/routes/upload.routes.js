import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const r = Router();

// -----------------------------
// 📁 Ensure directories exist
// -----------------------------
const uploadDir = "uploads/products";
const pdfDir = "uploads/products/pdf";

[uploadDir, pdfDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// -----------------------------
// 🧠 Multer Storage Config
// -----------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ✅ If it's a PDF, save in /uploads/products/pdf
    if (file.mimetype === "application/pdf") {
      cb(null, pdfDir);
    } else {
      cb(null, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

// -----------------------------
// 🧾 File Filter
// -----------------------------
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
  const allowedPdfType = "application/pdf";

  if (allowedImageTypes.includes(file.mimetype) || file.mimetype === allowedPdfType) {
    cb(null, true);
  } else {
    cb(new Error("Only images (JPG, PNG, WEBP) and PDF files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// -----------------------------
// 🚀 ROUTES
// -----------------------------

// 🔹 Single image upload
r.post("/image", requireAuth, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded." });
  res.status(201).json({ url: `/uploads/products/${req.file.filename}` });
});

// 🔹 Multiple images upload
r.post("/images", requireAuth, upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0)
    return res.status(400).json({ error: "No images uploaded." });

  const urls = req.files.map((file) => `/uploads/products/${file.filename}`);
  res.status(201).json({ urls });
});

// 🔹 PDF upload
r.post("/pdf", requireAuth, upload.single("pdf"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No PDF uploaded." });

  // ✅ PDF stored in /uploads/products/pdf
  res.status(201).json({ url: `/uploads/products/pdf/${req.file.filename}` });
});

export default r;
