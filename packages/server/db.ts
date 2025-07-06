import { SequelizeOptions, Sequelize } from 'sequelize-typescript';
import { Topic } from './app/models/topic.model';
import { Reply } from './app/models/reply.model';
import { Comment } from './app/models/comment.model';
import { Reaction } from './app/models/reaction.model';
import { CommentReaction } from './app/models/comment_reactions.model';
import { Theme } from './app/models/theme.model';
import { UserTheme } from './app/models/user_theme.model';
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const isDev = process.env.NODE_ENV === 'development';

const sequelizeOptions: SequelizeOptions = {
  host: isDev ? 'localhost' : 'db',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [Topic, Comment, Reply, Reaction, CommentReaction, Theme, UserTheme] // 'mysql', 'sqlite', 'mariadb', 'mssql'
};

export const sequelize = new Sequelize(sequelizeOptions);

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
