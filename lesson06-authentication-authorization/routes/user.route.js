import express from 'express';
import UserController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.mdw.js';

const router = express.Router();

// Create new user
router.post(
  '/', //Check endpoint
  authMiddleware.authentication, // Xác minh danh tính
  authMiddleware.adminAuthorization, // Phân quyền
  UserController.create // Xư lý logic
);

router.get('/', authMiddleware.authentication, UserController.getAll);

router.get('/:id', authMiddleware.authentication, UserController.getOne);

export default router;
