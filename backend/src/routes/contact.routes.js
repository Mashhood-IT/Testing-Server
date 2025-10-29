import express from "express";
import { submitContactForm } from "../controllers/contact.controller.js";

const router = express.Router();

// Contact form submission
router.post("/submit", submitContactForm);

export default router;
