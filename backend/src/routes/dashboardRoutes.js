import express from 'express';
import { getDashboardStats, getRecentActivity, clearActivity } from '../controllers/dashboardController.js';
import { authenticateAdmin } from '../middleware/adminAuthMiddleware.js';

const router = express.Router();

router.get('/stats', getDashboardStats);
// Protect activity routes with admin auth to access user data
router.get('/activity', authenticateAdmin, getRecentActivity);
router.post('/activity/clear', authenticateAdmin, clearActivity);

export default router;
