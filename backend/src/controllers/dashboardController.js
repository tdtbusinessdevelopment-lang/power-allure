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
// Get recent activity
export const getRecentActivity = async (req, res) => {
  try {
    // 1. Get recent users (limited to 5)
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('username createdAt');

    // 2. Get recent bookings (limited to 5)
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('modelName createdAt status');

    // 3. Get recent models (limited to 5)
    const recentLocalModels = await LocalModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name createdAt');
      
    // Combine activities
    const activities = [
      ...recentUsers.map(u => ({
        type: 'user',
        action: `New user registered: ${u.username}`,
        time: u.createdAt,
        originalTime: new Date(u.createdAt)
      })),
      ...recentBookings.map(b => ({
        type: 'booking',
        action: `New booking for ${b.modelName} (${b.status})`,
        time: b.createdAt,
        originalTime: new Date(b.createdAt)
      })),
      ...recentLocalModels.map(m => ({
        type: 'model',
        action: `Model uploaded: ${m.name}`,
        time: m.createdAt,
        originalTime: new Date(m.createdAt)
      }))
    ];

    // Sort combined activities by date (newest first) and take top 10
    activities.sort((a, b) => b.originalTime - a.originalTime);
    const topActivities = activities.slice(0, 10);

    // Format time for display (e.g., "10 mins ago")
    // Note: detailed formatting is better done on frontend, sending ISO string here
    
    res.status(200).json({
      success: true,
      activities: topActivities
    });
  } catch (error) {
    console.error("Get recent activity error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching recent activity",
    });
  }
};
