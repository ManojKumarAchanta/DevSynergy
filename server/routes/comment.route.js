import { Router } from 'express';
import {
  createCommentByPostId,
  deleteComment,
  getCommentsByPostId,
} from '../controllers/comment.controller.js';

const commentRouter = Router();

//get all comments of a post
commentRouter.get('/:postId', getCommentsByPostId);
//create a comment on a post
commentRouter.post('/:postId', createCommentByPostId);
//delete a comment on a post
commentRouter.delete('/:postId/:commentId', deleteComment);

export default commentRouter;
