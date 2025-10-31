import fs from "fs";
import express from "express"
import path from "path";
import dotenv from "dotenv";
import http from "http";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { createSuperAdmin } from "./src/utils/createSuperAdmin.js";
import { fileURLToPath } from "url";
import cors from "cors"
dotenv.config()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors())
// -----------------------------
//  PORT CONFIG
// -----------------------------
const PORT = process.env.PORT || 5000;

// -----------------------------
//  Ensure 'uploads/products' directory exists
// -----------------------------
const uploadsPath = path.join(process.cwd(), "uploads/products");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log("✅ Created 'uploads/products' directory.");
}

// -----------------------------
//  SERVER STARTUP
// -----------------------------
const startServer = async () => {
  try {
    // ✅ Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected");

    // ✅ Ensure SuperAdmin exists
    await createSuperAdmin();

    // ✅ Start server
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
