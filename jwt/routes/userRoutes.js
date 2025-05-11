// routes/userRoutes.js
import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (requires token)
router.get('/profile', protect, getUserProfile);

// Add other user-related routes here

export default router;
