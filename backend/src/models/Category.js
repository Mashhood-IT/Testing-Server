import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true },
  status: { type: String, enum: ["active","inactive"], default: "active" }
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
