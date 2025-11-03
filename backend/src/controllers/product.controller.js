import Product from "../models/Product.js";

import path from "path";
import fs from "fs";

// -----------------------------
// GET all products (pagination + search filter + category filter)
// -----------------------------
export const list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "12");
    const q = req.query.q || "";
    const category = req.query.category || "";

    const filter = {};

    // 🔍 Search filter
    if (q) {
      filter.title = { $regex: q, $options: "i" };
    }

    // ✅ Category filter
    if (category) {
      filter.category = category;
    }

 

    const total = await Product.countDocuments(filter);

    const items = await Product.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ total, items });
  } catch (e) {
    next(e);
  }
};

// -----------------------------
// GET single product
// -----------------------------
export const getOne = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (e) {
    next(e);
  }
};

// -----------------------------
// CREATE new product
// -----------------------------
export const create = async (req, res, next) => {
  try {
    const body = req.body;

    // Basic required fields check
    if (!body.title || !body.slug || !body.category ) {
      return res.status(400).json({
        message: "Title, slug, category are required.",
      });
    }

    // Optional: Validate tabs format if present
    if (body.tabs && !Array.isArray(body.tabs)) {
      return res.status(400).json({ message: "Tabs must be an array." });
    }

    // Optional: Validate each tab object structure (can be extended)
    if (body.tabs) {
      for (const tab of body.tabs) {
        if (!tab.tab || !tab.tabName || !tab.tabDescription) {
          return res.status(400).json({
            message: "Each tab must have tab, tabName, and tabDescription fields.",
          });
        }
      }
    }

    const newProduct = new Product(body);
    const product = await newProduct.save();

    res.status(201).json(product);
  } catch (e) {
    next(e);
  }
};

export const update = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    if (req.body.tabs && !Array.isArray(req.body.tabs)) {
      return res.status(400).json({ message: "Tabs must be an array." });
    }

    if (req.body.tabs) {
      for (const tab of req.body.tabs) {
        if (!tab.tab || !tab.tabName || !tab.tabDescription) {
          return res.status(400).json({
            message: "Each tab must have tab, tabName, and tabDescription fields.",
          });
        }
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body }, // partial updates allowed
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (e) {
    next(e);
  }
};


// -----------------------------
// DELETE product
// -----------------------------
export const remove = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
};


// products.controller.js
export const getProductPdf = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (!product.pdf) return res.status(404).json({ message: "PDF not found for this product" });

    // If it's a URL, just redirect
    if (/^https?:\/\//i.test(product.pdf)) {
      return res.redirect(product.pdf);
    }

    // Otherwise treat as local relative path
    const pdfPath = path.isAbsolute(product.pdf)
      ? product.pdf
      : path.join(process.cwd(), product.pdf);

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ message: "PDF file not found on server" });
    }

    return res.download(pdfPath, path.basename(pdfPath));
  } catch (error) {
    next(error);
  }
};
