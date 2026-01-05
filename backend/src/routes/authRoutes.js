import express from "express";
import { login, register, validateSession } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/validate-session", validateSession);

export default router;
