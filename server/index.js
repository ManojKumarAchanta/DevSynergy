import express from 'express';
import { configDotenv } from 'dotenv';
import connectToDB from './db/config.js';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import profileRouter from './routes/profile.route.js';
import cookieParser from 'cookie-parser';
import postRouter from './routes/post.route.js';

const app = express();

configDotenv({ path: './.env' });

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());
//routes
app.use('/auth', authRouter);
app.use('/profile', authMiddleware, profileRouter);
app.use("/posts",authMiddleware, postRouter);
app.listen(PORT, () => {
  connectToDB();
  console.log('server running at port http://localhost:8000');
});
