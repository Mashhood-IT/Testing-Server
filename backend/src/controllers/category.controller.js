import Category from "../models/Category.js";

export const list = async (req, res, next) => {
  try {
    const { q, status="active" } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (q) filter.name = { $regex: q, $options: "i" };
    const data = await Category.find(filter).sort({ createdAt: -1 });
    res.json(data);
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    const { name, slug, status="active" } = req.body;
    const c = await Category.create({ name, slug, status });
    res.status(201).json(c);
  } catch (e) { next(e); }
};

export const update = async (req, res, next) => {
  try {
    const c = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(c);
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
};
