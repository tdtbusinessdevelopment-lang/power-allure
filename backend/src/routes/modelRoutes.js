import { Router } from "express";
import {
  getLocalModels,
  getForeignModels,
  getModelById,
  createLocalModel,
  createForeignModel,
  deleteModel
} from "../controllers/modelController.js";

const router = Router();

// GET routes
router.get("/local", getLocalModels);
router.get("/foreign", getForeignModels);
router.get("/:id", getModelById);

// POST routes
router.post("/local", createLocalModel);
router.post("/foreign", createForeignModel);

// DELETE route
router.delete("/:id", deleteModel);

export default router;
