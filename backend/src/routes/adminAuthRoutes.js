import express from "express";
import { adminLogin, validateSession } from "../controllers/adminAuthController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/validate-session", validateSession);

export default router;
