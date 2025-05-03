import { Router } from 'express';
import {
  avatarUploader,
  getProfile,
  updateProfile,
  viewProfile,
} from '../controllers/profile.controller.js';
import multer from 'multer';
const storage = multer.memoryStorage(); // No disk storage
const upload = multer({ storage });

const profileRouter = Router();

// Get current authenticated user's profile
profileRouter.get('/', viewProfile);

// Update current authenticated user's profile
profileRouter.put('/', updateProfile);

// Get any user's profile by username
profileRouter.get('/:username', getProfile);

profileRouter.post('/upload', upload.single('image'), avatarUploader);

export default profileRouter;
