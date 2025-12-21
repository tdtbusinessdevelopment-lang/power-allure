import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

export const authenticateAdmin = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("AdminMiddleware Decoded:", decoded);

    // Attach user to request
    req.user = decoded;

    // Verify admin user exists
    const admin = await AdminUser.findById(decoded.id).select("-password");
    console.log("AdminMiddleware DB Result:", admin ? "Found" : "Not Found", "for ID:", decoded.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin user not found.",
      });
    }

    req.adminData = admin;
    next();
  } catch (error) {
    console.error("Admin auth middleware error:", error);
    
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        success: false,
        message: "Invalid token.",
      });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        message: "Token expired.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during authentication.",
    });
  }
};
