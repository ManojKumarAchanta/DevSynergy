import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostsByUser,
  updatePost,
} from '../controllers/post.controller.js';

const postRouter = Router();

//create new post
postRouter.post('/', createPost);
//get feed or all posts of all users
postRouter.get('/', getAllPosts);
//get posts of a specific user by username
postRouter.get('/:username', getPostsByUser);
//delete own post
postRouter.delete('/:id', deletePost);
//update post
postRouter.put('/:id', updatePost);
export default postRouter;
