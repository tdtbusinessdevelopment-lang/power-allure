import express from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.post("/", authenticateToken, createBooking);
router.get("/", authenticateToken, getAllBookings);
router.get("/user/:userId", authenticateToken, getUserBookings);
router.get("/:id", authenticateToken, getBookingById);
router.put("/:id/status", authenticateToken, updateBookingStatus);
router.delete("/:id", authenticateToken, deleteBooking);

export default router;
