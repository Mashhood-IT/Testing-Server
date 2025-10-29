import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { getMe, updateMe } from "../controllers/user.controller.js";
const r = Router();
r.get("/me", requireAuth, getMe);
r.put("/me", requireAuth, upload.single("avatar"), updateMe);
export default r;
