import AdminUser from "../models/AdminUser.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both username and password",
      });
    }

    // Input sanitization - limit length and check for dangerous characters
    if (username.length > 50 || password.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Invalid input length",
      });
    }

    // Sanitize username - only allow alphanumeric and certain special chars
    const sanitizedUsername = username.replace(/[^\w\-_.]/g, '');
    
    if (sanitizedUsername !== username) {
      return res.status(400).json({
        success: false,
        message: "Username contains invalid characters",
      });
    }

    // Find admin user by username
    const adminUser = await AdminUser.findOne({ username: sanitizedUsername });

    if (!adminUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // Create and sign a JWT with admin role
    const token = jwt.sign(
      { 
        id: adminUser._id,
        role: adminUser.role,
        isAdmin: true
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Successful login
    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      user: {
        _id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during admin login",
    });
  }
};
