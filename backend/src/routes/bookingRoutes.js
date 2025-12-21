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

const router = express.Router();

// All routes require authentication
// All routes require authentication
router.post("/", authenticateAdmin, createBooking);
router.get("/", authenticateAdmin, getAllBookings);
router.get("/user/:userId", authenticateAdmin, getUserBookings);
router.get("/:id", authenticateAdmin, getBookingById);
router.put("/:id/status", authenticateAdmin, updateBookingStatus);
router.delete("/:id", authenticateAdmin, deleteBooking);

export default router;
