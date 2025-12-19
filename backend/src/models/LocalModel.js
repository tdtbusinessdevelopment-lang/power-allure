import mongoose from "mongoose";

const localModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String },
  height: { type: String },
  weight: { type: String },
  imageUrl: { type: String, required: true },
  galleryImages: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("LocalModel", localModelSchema, "Local");
