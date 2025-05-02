import Post from '../models/post.model.js';

export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate(
      'comments.author',
      'username name avatarUrl'
    );
    if (!post) {
      return res
        .status(404)
        .json({ message: 'Post not found', success: false });
    }
    return res.status(200).json({
      message: 'Comments fetched successfully',
      success: true,
      comments: post.comments,
    });
  } catch (error) {
    console.error('Error fetching comments:', error.message);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

export const createCommentByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments.push({ author: userId, content });
    await post.save();

    const populatedPost = await post.populate(
      'comments.author',
      'name username avatarUrl'
    );
    res.status(201).json({ message: 'Comment added', post: populatedPost });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to add comment', error: err.message });
  }
};
//delete comment by checking if present user is author or not

export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params; // we now need commentId in the route
    const { id: userId } = req.user;

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Find the specific comment by its ID
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const comment = post.comments[commentIndex];

    // Make sure the comment's author matches the current user
    const authorId =
      typeof comment.author === 'object'
        ? comment.author._id?.toString()
        : comment.author?.toString();

    if (authorId !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this comment' });
    }

    // Delete the comment
    post.comments.splice(commentIndex, 1);
    await post.save();

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to delete comment', error: error.message });
  }
};
