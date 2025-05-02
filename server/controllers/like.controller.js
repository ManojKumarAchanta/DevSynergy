import mongoose from 'mongoose';
import Post from '../models/post.model.js';

export const likeHandler = async (req, res) => {
  try {
    const { postId } = req.params;
    //find user who is liking the post
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    //find post by Id
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const alreadyLiked = post.likes.includes(userId);
    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();

    return res.status(200).json({
      message: alreadyLiked ? 'Post unliked' : 'Post liked',
      likes: post.likes,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'failed to like the post' + error.message,
      success: false,
    });
  }
};
