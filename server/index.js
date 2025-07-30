import express from 'express';
import { configDotenv } from 'dotenv';
import connectToDB from './db/config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//middlewares
import { authMiddleware } from './middleware/auth.middleware.js';

//routers
import authRouter from './routes/auth.route.js';
import profileRouter from './routes/profile.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import likeRouter from './routes/like.route.js';

const app = express();

configDotenv({ path: './.env' });

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);

app.use(cookieParser());
//routes
app.use('/api/auth', authRouter);
app.use('/api/profile', authMiddleware, profileRouter);
app.use('/api/posts', authMiddleware, postRouter);
app.use('/api/comments', authMiddleware, commentRouter);
app.use('/api/like', authMiddleware, likeRouter);

app.listen(PORT, () => {
  connectToDB();
  console.log('server running at port http://localhost:8000');
});
