import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";

const postRouter = Router();

//create new post
postRouter.post("/",createPost);

export default postRouter;