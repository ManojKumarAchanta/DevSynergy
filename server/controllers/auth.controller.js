import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateTokens } from '../utils/tokenGenerator.js';
import sendEmail from '../utils/mailer.js';
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists
    console.log(email, password);
    const user = await User.findOne({ email });
    //if user doesn't exists
    console.log('user: ', user);
    if (!user) {
      return res
        .status(400)
        .json({ message: 'User not Exist', success: false });
    }
    //if user exists validate his password
    const validUser = await bcrypt.compare(password, user.password);
    console.log(user.password, password);
    console.log(validUser);
    if (!validUser) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials', success: false });
    }
    const { accessToken, refreshToken } = generateTokens(user);
    
    // Set cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: 'Logged in successfully',
      accessToken,
      refreshToken, // Also send in response for testing
      user,
      success: true,
    });
  } catch (error) {
    console.log('Error in login controller '.error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error' + error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    //check if user already exists
    const userData = req.body;

    const { email } = userData;

    //check in db
    const user = await User.findOne({ email });
    //if user already exists
    if (user) {
      return res
        .status(400)
        .json({ message: 'User Already Exist', success: false });
    }

    //if user not exists create a user
    const { username, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userInstance = new User({
      email,
      username,
      name,
      password: hashedPassword,
    });

    console.log('Saving new user...');
    const newUser = await userInstance.save();
    console.log('New User Saved:', newUser); // 👈 THIS is important

    if (!newUser || !newUser._id) {
      console.error('User creation failed or _id is missing:', newUser);
      return res.status(500).json({
        message: 'User creation failed',
        success: false,
      });
    }

    //send verification email
    await sendEmail({ email, emailType: 'VERIFY', userId: newUser._id });

    //generate tokens
    const { accessToken, refreshToken } = generateTokens(newUser);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: 'Signed up Successfully',
      success: true,
      accessToken,
      user: newUser,
    });
  } catch (error) {
    console.log('Error in signup controller' + error.message);
    return res.status(500).json({
      message: 'Internal server error' + error.message,
      success: false,
    });
  }
};
export const refreshToken = async (req, res) => {
  try {
    // Get refresh token from either cookies or request body
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({ 
        message: 'No refresh token found', 
        success: false 
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(403).json({ 
        message: 'Invalid refresh token', 
        success: false 
      });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    // Send new access token
    return res.status(200).json({ 
      message: 'Token refreshed successfully',
      accessToken: newAccessToken, 
      success: true 
    });
  } catch (err) {
    console.error('Refresh token error:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Refresh token expired', 
        success: false 
      });
    }
    return res.status(403).json({ 
      message: 'Invalid refresh token', 
      success: false 
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Logged out successfully', success: true });
  } catch (error) {
    console.log('Error while logging out' + error.message);
    return res
      .status(500)
      .json({ message: 'Error while logging out', success: false });
  }
};

export async function verifyemail(req, res) {
  try {
    const reqBody = req.query;
    const { token } = reqBody; // Extract email and token from the request body
    console.log('token: ', token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }, // Check if the token is not expired
    });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
    console.log(user);
    user.isEmailVerified = true; // Set the user as verified
    user.verifyToken = undefined; // Remove the token from the user document
    user.verifyTokenExpiry = undefined; // Remove the token expiry from the user document
    await user.save(); // Save the updated user document

    // If the user is found and verified, send a success response
    return res
      .status(200)
      .json({ message: 'Email verified successfully', success: true });
  } catch (error) {
    console.log('Error in verify email route:', error);
    return res.status(200).json({ error: 'Error verifying email' });
  }
}
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No user found!', success: true });
    }
    const emailRes = await sendEmail({
      email,
      emailType: 'RESET',
      userId: user._id,
    });
    console.log('Email Response: ', emailRes);

    return res
      .status(200)
      .json({ emailRes, message: 'Email sent successfully.', success: 'true' });
  } catch (error) {
    console.log('Error in forgot password route: sending email failed', error);
    return res
      .status(500)
      .json({ error: 'Error in seding forgot password email' + error });
  }
}
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    console.log(token, password);
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    }); // Check if the token is not expired });
    if (!user) {
      return res.status(400).json({ message: 'no user found' });
    }
    //update password
    //hash password and replace old password with new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined; // Remove the token from the user document
    user.forgotPasswordTokenExpiry = undefined; // Remove the token expiry from the user document
    await user.save(); // Save the updated user document

    // If the user is found and verified, send a success response
    return res
      .status(200)
      .json({ message: 'Reset password successfull', success: true });
  } catch (error) {
    console.log('Error in reset password route:', error);
    return res.status(200).json({ error: 'Error resetting password ' });
  }
};
