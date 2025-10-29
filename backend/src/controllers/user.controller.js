import User from "../models/User.js";

export const getMe = (req, res) => {
  const u = req.user;
  res.json({ id: u._id, email: u.email, name: u.name, role: u.role, avatar: u.avatar });
};

export const updateMe = async (req, res, next) => {
  try {
    const updates = { name: req.body.name };
    if (req.file) updates.avatar = `/${req.file.path.replace("\\","/")}`;
    const u = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ id: u._id, email: u.email, name: u.name, role: u.role, avatar: u.avatar });
  } catch (e) { next(e); }
};
