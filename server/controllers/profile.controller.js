import User from '../models/user.model.js';

export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ 
        message: 'Username is required', 
        success: false 
      });
    }
    
    const user = await User.findOne({ username }).select('-password');
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found', 
        success: false 
      });
    }
    
    return res.status(200).json({ 
      message: 'Profile fetched successfully',
      success: true,
      user 
    });
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return res.status(500).json({
      message: 'Failed to get user profile',
      error: error.message,
      success: false
    });
  }
};

export const viewProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        message: 'Unauthorized access', 
        success: false 
      });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false
      });
    }

    return res.status(200).json({
      message: 'Profile fetched successfully',
      success: true,
      user
    });
  } catch (error) {
    console.error('Failed to view profile:', error);
    return res.status(500).json({
      message: 'Failed to view profile',
      error: error.message,
      success: false
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        message: 'Unauthorized access', 
        success: false 
      });
    }

    const { user: updateData } = req.body;
    if (!updateData) {
      return res.status(400).json({
        message: 'Update data is required',
        success: false
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
        success: false
      });
    }

    return res.status(200).json({
      message: 'Profile updated successfully',
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error('Failed to update profile:', error);
    return res.status(500).json({
      message: 'Failed to update profile',
      error: error.message,
      success: false
    });
  }
};
