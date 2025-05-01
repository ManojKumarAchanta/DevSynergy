import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  viewProfile,
} from '../controllers/profile.controller.js';

const profileRouter = Router();

// Get current authenticated user's profile
profileRouter.get('/', viewProfile);

// Update current authenticated user's profile
profileRouter.put('/', updateProfile);

// Get any user's profile by username
profileRouter.get('/:username', getProfile);

export default profileRouter;
