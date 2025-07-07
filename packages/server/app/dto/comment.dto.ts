import { ReplyDto } from './reply.dto';
import { ReactionDto } from './reaction.dto';

export interface CreateCommentDto {
  topicId: number;
  author: string;
  text: string;
}

export interface CommentDto {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies?: ReplyDto[];
  reactions?: ReactionDto[];
}

export interface LastCommentInfoDto {
  author: string;
  createdAt: string;
}
