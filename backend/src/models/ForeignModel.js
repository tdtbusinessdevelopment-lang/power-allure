import mongoose from "mongoose";

const foreignModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  description: { type: String },
  height: { type: String },
  weight: { type: String },
  imageUrl: { type: String, required: true },
  galleryImages: [{ type: String }],
  available: { type: Boolean, default: true },
  favoritesCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("ForeignModel", foreignModelSchema, "Foreign");
