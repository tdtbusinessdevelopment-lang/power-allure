import LocalModel from "../models/LocalModel.js";
import ForeignModel from "../models/ForeignModel.js";
import mongoose from "mongoose";

// Get all local models
export const getLocalModels = async (req, res) => {
  try {
    const models = await LocalModel.find();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all foreign models
export const getForeignModels = async (req, res) => {
  try {
    const models = await ForeignModel.find();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single model by ID (searches both collections)
export const getModelById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid model ID" });
    }

    // Try to find in LocalModel first
    let model = await LocalModel.findById(id);
    let category = "Local";
    
    // If not found, try ForeignModel
    if (!model) {
      model = await ForeignModel.findById(id);
      category = "Foreign";
    }

    if (!model) {
      return res.status(404).json({ error: "Model not found" });
    }

    // Add category to the response
    const modelWithCategory = {
      ...model.toObject(),
      category: category
    };

    res.json(modelWithCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create local model
export const createLocalModel = async (req, res) => {
  try {
    const model = await LocalModel.create(req.body);
    res.status(201).json({ message: "Local model created!", model });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create foreign model
export const createForeignModel = async (req, res) => {
  try {
    const model = await ForeignModel.create(req.body);
    res.status(201).json({ message: "Foreign model created!", model });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
