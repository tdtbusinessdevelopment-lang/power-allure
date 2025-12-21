import { Router } from "express";
import {
  getLocalModels,
  getForeignModels,
  getModelById,
  createLocalModel,
  createForeignModel,
  updateModel,
  deleteModel,
  getModelLikes
} from "../controllers/modelController.js";

const router = Router();

// GET routes
router.get("/local", getLocalModels);
router.get("/foreign", getForeignModels);
router.get("/:id", getModelById);
router.get("/:id/likes", getModelLikes);

// POST routes
router.post("/local", createLocalModel);
router.post("/foreign", createForeignModel);

// PUT route
router.put("/:id", updateModel);

// DELETE route
router.delete("/:id", deleteModel);

export default router;
