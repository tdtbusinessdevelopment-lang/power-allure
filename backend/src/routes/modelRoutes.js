import { Router } from "express";
import {
  getLocalModels,
  getForeignModels,
  getModelById,
  createLocalModel,
  createForeignModel
} from "../controllers/modelController.js";

const router = Router();

// GET routes
router.get("/local", getLocalModels);
router.get("/foreign", getForeignModels);
router.get("/:id", getModelById);

// POST routes
router.post("/local", createLocalModel);
router.post("/foreign", createForeignModel);

export default router;
