import { Router } from 'express';
import {
  login,
  signup,
  refreshToken,
  logout,
  verifyemail,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller.js';
const authRouter = Router();

authRouter
  .post('/login', login)
  .post('/signup', signup)
  .post('/refreshtoken', refreshToken)
  .post('/logout', logout)
  .post('/verifyemail', verifyemail)
  .post('/forgotpassword', forgotPassword)
  .post('/reset-password', resetPassword);

export default authRouter;
