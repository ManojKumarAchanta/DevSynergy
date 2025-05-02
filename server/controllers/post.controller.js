import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';

//feed or posts of all users
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      'author',
      'name username avatarUrl'
    );
    if (posts.length < 0) {
      console.log('No posts found');
      return res.status(400).json({ error: 'No post found', success: false });
    }
    return res.status(200).json({
      success: true,
      message: 'Feteched all posts successfully',
      posts,
    });
  } catch (error) {
    console.log('Error in getAll Posts controller.', error.message);
    return res
      .status(500)
      .json({ newPost, error: 'Failed to get all posts', success: false });
  }
};
//create a post
export const createPost = async (req, res) => {
  try {
    const postData = req.body;
    if (!postData.content || !postData.title) {
      return res.status(400).json({
        error: 'Missing required fields: content and title',
        success: false,
      });
    }
    const newPost = await Post.create({
      author: req.user.id,
      content: postData.content,
      title: postData.title,
      imageUrl: postData.imageUrl,
      tags: postData.tags,
    });
    return res
      .status(201)
      .json({ newPost, message: 'Uploaded post successfully', success: true });
  } catch (error) {
    console.log('Error in createPost controller.', error.message);
    return res
      .status(500)
      .json({ error: 'Failed to upload post', success: false });
  }
};

//get posts of a specific user
export const getPostsByUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'No user found', success: false });
    }
    const posts = await Post.find({ author: user._id })
      .populate('author', 'name username avatarUrl')
      .lean();
    return res.status(200).json({
      message: 'Successfully fetched all posts of ' + username,
      success: true,
      posts,
    });
  } catch (error) {
    console.log('Error in getpost by username controller.', error.message);
    return res.status(500).json({
      error: 'Failed to get post by username' + error.message,
      success: false,
    });
  }
};

//delete own post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res
        .status(400)
        .json({ error: 'No post found to delete', success: false });
    }
    return res.status(204).json({
      message: 'Deleted post scucessfully',
      deletedPost,
      success: true,
    });
  } catch (error) {
    console.log('Error in delete post controller.', error.message);
    return res
      .status(500)
      .json({ error: 'Failed to delete post' + error.message, success: false });
  }
};

//update own post

export const updatePost = async (req, res) => {
  try {
    const updates = req.body;
    const { id } = req.params;
    if (!updates) {
      return res.status(400).json({
        message: 'Update data is required',
        success: false,
      });
    }
    const updatedPost = await Post.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    console.log('updated post: ', updatedPost);
    if (!updatedPost) {
      return res.status(404).json({
        message: 'Post not found',
        success: false,
      });
    }
    return res.status(200).json({
      message: 'Post updated successfully',
      updatedPost,
      success: true,
    });
  } catch (error) {
    console.log('Error in update post controller.', error.message);
    return res
      .status(500)
      .json({ error: 'Failed to update post' + error.message, success: false });
  }
};
