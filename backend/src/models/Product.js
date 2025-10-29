import mongoose from "mongoose";


const TabSchema = new mongoose.Schema({
  tab: { type: String, required: true },
  tabName: { type: String, required: true },
  tabDescription: { type: String, required: true }
},{_id: false})

const AdditionalDescription = new mongoose.Schema({
  tagline: String,
  title2:String,
  subTitle2:String,
  description2:String
})
const SpecificationItemSchema = new mongoose.Schema(
  {
    label: { type: String },
    value: { type: String },
  },
  { _id: false }
);

const FaqItemSchema = new mongoose.Schema(
  {
    question: { type: String, },
    answer: { type: String, },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    productAdditional: AdditionalDescription,
    tabs: [TabSchema],
    title: { type: String, required: true, trim: true, minlength: 2 },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
specs: { type: [SpecificationItemSchema], default: [] },
faqs: { type: [FaqItemSchema], default: [] }, 
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    pdf: {
type: String,
default: null
    },

    description: { type: String, trim: true },


    stock: { type: Number, default: 0, min: 0 },

    images: {
      type: [String],
      default: [], // ✅ ensures empty array instead of undefined
    },

    colors: { type: [String], default: [] }, // not needed
    sizes: { type: [String], default: [] }, // not needed

    brand: { type: String, default: "", trim: true }, // not needed

    features: { type: [String], default: [] }, // not needed

    specifications: { type: mongoose.Schema.Types.Mixed, default: {} }, // ✅ flexible // not needed

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
  },
  { 
    timestamps: true, 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
  }
);

// ✅ Useful indexes for faster queries
productSchema.index({ title: "text", description: "text", brand: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
