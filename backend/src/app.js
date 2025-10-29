// -----------------------------
//  Core Imports
// -----------------------------
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// -----------------------------
//  Local Imports
// -----------------------------
import connectDB from "./config/db.js";

// Route Imports
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import contactRoutes from "./routes/contact.routes.js";

// Middleware
import errorHandler from "./middleware/errorHandler.js";

// -----------------------------
//  Environment Setup
// -----------------------------
dotenv.config();
connectDB();

// -----------------------------
//  Initialize Express App
// -----------------------------
const app = express();

// -----------------------------
//  Global Middleware
// -----------------------------
app.use(cors( {
  origin : "https://safnsafl.netlify.app"
})); // allow frontend requests
// app.use(helmet()); // secure HTTP headers
app.use(morgan("dev")); // log all requests
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form-data

// -----------------------------
//  Static File Setup (uploads folder)
// -----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// -----------------------------
//  API Routes
// -----------------------------
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);

// -----------------------------
//  Error Handling Middleware
// -----------------------------
app.use(errorHandler);

// -----------------------------
//  Health Check Route
// -----------------------------
app.get("/", (req, res) => {
  res.json({ message: "API is running successfully 🚀" });
});

// -----------------------------
//  Export App
// -----------------------------
export default app;
