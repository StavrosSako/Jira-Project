import express from 'express';

const router = express.Router();
import { body } from 'express-validator';
import userController from '../controllers/userController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const registerValidation = [
  body('username').trim().isLength({ min: 3, max: 50 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
];

router.post('/register', registerValidation, userController.register);
router.post('/login', userController.login);

router.get('/users', authenticateToken, authorizeRole('admin', 'team_leader'), userController.getUsers);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.put('/users/:id', authenticateToken, authorizeRole('admin'), userController.updateUser);
router.delete('/users/:id', authenticateToken, authorizeRole('admin'), userController.deleteUser);
router.patch('/users/:id/approve', authenticateToken, authorizeRole('admin'), userController.approveUser);
router.patch('/users/:id/reject', authenticateToken, authorizeRole('admin'), userController.rejectUser);

export default router;

