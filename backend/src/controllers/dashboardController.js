import User from '../models/User.js';
import LocalModel from '../models/LocalModel.js';
import ForeignModel from '../models/ForeignModel.js';
import Booking from '../models/Booking.js';

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments();
    
    // Get total local models count
    const totalLocalModels = await LocalModel.countDocuments();
    
    // Get total foreign models count
    const totalForeignModels = await ForeignModel.countDocuments();
    
    // Get active local models count (available = true)
    const activeLocalModels = await LocalModel.countDocuments({ available: true });
    
    // Get active foreign models count (available = true)
    const activeForeignModels = await ForeignModel.countDocuments({ available: true });
    
    // Get booking statistics
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    
    // Calculate totals
    const totalModels = totalLocalModels + totalForeignModels;
    const activeModels = activeLocalModels + activeForeignModels;
    
    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalModels,
        activeModels,
        totalLocalModels,
        totalForeignModels,
        activeLocalModels,
        activeForeignModels,
        totalBookings,
        pendingBookings,
        confirmedBookings,
      },
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching dashboard statistics",
    });
  }
};
