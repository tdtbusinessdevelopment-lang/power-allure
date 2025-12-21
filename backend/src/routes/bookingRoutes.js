import express from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";
import { authenticateAdmin } from "../middleware/adminAuthMiddleware.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public/User Routes
router.post("/", authenticateToken, createBooking);
router.get("/my-bookings", authenticateToken, getUserBookings);

// Admin Routes
router.get("/", authenticateAdmin, getAllBookings);
router.get("/user/:userId", authenticateAdmin, getUserBookings);
router.get("/:id", authenticateAdmin, getBookingById);
router.put("/:id/status", authenticateAdmin, updateBookingStatus);
router.delete("/:id", authenticateAdmin, deleteBooking);

export default router;
