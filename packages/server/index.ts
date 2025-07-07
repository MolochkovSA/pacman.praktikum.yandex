import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import { dbConnect } from './db';
// import { ensureAuthenticated } from './app/middleware/ensureAuthenticated';
import topicRouter from './app/routers/topic.router';
import commentRouter from './app/routers/comment.router';
import replyRouter from './app/routers/reply.router';
import reactionRouter from './app/routers/reaction.router';
import themeRouter from './app/routers/theme.router';
import userThemeRouter from './app/routers/user_theme.router';
import { setThemes } from './app/utils/setThemes';
import { setEmojis } from './app/utils/setEmojis';

var cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = Number(process.env.SERVER_PORT) || 3001;

dbConnect().then(() => {
  setThemes();
  setEmojis();
});

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

// app.use('/api', ensureAuthenticated);
app.use('/api', topicRouter);
app.use('/api', commentRouter);
app.use('/api', replyRouter);
app.use('/api', reactionRouter);
app.use('/api', themeRouter);
app.use('/api', userThemeRouter);

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
