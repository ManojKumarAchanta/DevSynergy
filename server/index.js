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
    origin: [
      'http://dev-synergy-6opn.vercel.app',
      'https://dev-synergy-6opn-git-main-manojkumar2055s-projects.vercel.app',
    ],
    methods: ['GET', 'PUT', 'PATCH', 'POST'],
    credentials: true,
  })
);
app.use(cookieParser());
//routes
app.use('/auth', authRouter);
app.use('/profile', authMiddleware, profileRouter);
app.use('/posts', authMiddleware, postRouter);
app.use('/comments', authMiddleware, commentRouter);
app.use('/like', authMiddleware, likeRouter);

app.listen(PORT, () => {
  connectToDB();
  console.log('server running at port http://localhost:8000');
});
