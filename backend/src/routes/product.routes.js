import { Router } from "express";
import { requireAuth, checkRoles } from "../middleware/auth.js"; // Import checkRoles middleware
import * as ctrl from "../controllers/product.controller.js";

const r = Router();

// Public list (for storefront)
r.get("/", ctrl.list);
r.get("/:id", ctrl.getOne);

// Superadmin protected CRUD routes
r.post("/", requireAuth, checkRoles('superadmin'), ctrl.create); // Only superadmins can create products
r.put("/:id", requireAuth, checkRoles('superadmin'), ctrl.update);  // Only superadmins can update products
r.delete("/:id", requireAuth, checkRoles('superadmin'), ctrl.remove);  // Only superadmins can delete products
r.get("/:id/pdf", ctrl.getProductPdf);

export default r;
