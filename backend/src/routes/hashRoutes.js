import express from "express";
import { hashPasswords } from "../controllers/hashPasswords.js";

const router = express.Router();

router.get("/hash-passwords", hashPasswords);

export default router;
