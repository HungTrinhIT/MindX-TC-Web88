import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();

// @desc Register a new user
// @route POST /api/auth/register
// @access public
router.post('/register', AuthController.registerUser);

// @desc Authenticate user and generate accessToken
// @route POST /api/auth/login
// @access public
router.post('/login', AuthController.loginUser);

export default router;
