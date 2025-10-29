import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import User from "../models/User.js";

await connectDB();

const email = "admin@gmail.com";
const password = "Usm@n123";
const name = "Super Admin";

const existing = await User.findOne({ email });

if (!existing) {
  const u = new User({ email, password, name });
  await u.save(); // ✅ will hash automatically
  console.log("✅ SuperAdmin created:", email);
} else {
  console.log("⚠️ SuperAdmin already exists:", email);
}

process.exit(0);
