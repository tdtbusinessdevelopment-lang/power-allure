import LocalModel from "../models/LocalModel.js";
import ForeignModel from "../models/ForeignModel.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";

// Helper function to upload to Cloudinary
const uploadToCloudinary = async (base64Image) => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'power-allure',
      resource_type: 'auto'
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
};

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

    // Validate ObjectId format and sanitize
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: "Invalid model ID format" });
    }

    // Check for path traversal attempts
    if (id.includes('..') || id.includes('/') || id.includes('\\')) {
      return res.status(400).json({ error: "Invalid model ID" });
    }

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

// Create local model with Cloudinary upload
export const createLocalModel = async (req, res) => {
  try {
    const { imageUrl, galleryImages, ...otherData } = req.body;
    
    // Upload main image to Cloudinary
    const uploadedImageUrl = await uploadToCloudinary(imageUrl);
    
    // Upload gallery images if present
    let uploadedGalleryUrls = [];
    if (galleryImages && galleryImages.length > 0) {
      const uploadPromises = galleryImages.map(img => uploadToCloudinary(img));
      uploadedGalleryUrls = await Promise.all(uploadPromises);
    }
    
    // Create model with uploaded URLs
    const modelData = {
      ...otherData,
      imageUrl: uploadedImageUrl,
      galleryImages: uploadedGalleryUrls
    };
    
    const model = await LocalModel.create(modelData);
    res.status(201).json({ message: "Local model created!", model });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create foreign model with Cloudinary upload
export const createForeignModel = async (req, res) => {
  try {
    const { imageUrl, galleryImages, ...otherData } = req.body;
    
    // Upload main image to Cloudinary
    const uploadedImageUrl = await uploadToCloudinary(imageUrl);
    
    // Upload gallery images if present
    let uploadedGalleryUrls = [];
    if (galleryImages && galleryImages.length > 0) {
      const uploadPromises = galleryImages.map(img => uploadToCloudinary(img));
      uploadedGalleryUrls = await Promise.all(uploadPromises);
    }
    
    // Create model with uploaded URLs
    const modelData = {
      ...otherData,
      imageUrl: uploadedImageUrl,
      galleryImages: uploadedGalleryUrls
    };
    
    const model = await ForeignModel.create(modelData);
    res.status(201).json({ message: "Foreign model created!", model });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete model by ID (searches both collections)
export const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid model ID" });
    }

    // Try to delete from LocalModel first
    let deletedModel = await LocalModel.findByIdAndDelete(id);
    
    // If not found, try ForeignModel
    if (!deletedModel) {
      deletedModel = await ForeignModel.findByIdAndDelete(id);
    }

    if (!deletedModel) {
      return res.status(404).json({ error: "Model not found" });
    }

    res.json({ message: "Model deleted successfully", model: deletedModel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

