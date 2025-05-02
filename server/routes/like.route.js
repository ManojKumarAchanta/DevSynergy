import { Router } from 'express';
import { likeHandler } from '../controllers/like.controller.js';
const likeRouter = Router();

likeRouter.post('/:postId', likeHandler);
export default likeRouter;
