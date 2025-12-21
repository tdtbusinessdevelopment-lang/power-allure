import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
  },
  role: {
    type: String,
    default: "admin",
    enum: ["admin", "superadmin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdminUser = mongoose.model("AdminUser", adminUserSchema, "AdminUsers");

export default AdminUser;
