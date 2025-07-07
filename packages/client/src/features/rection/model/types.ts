import { CommentId } from '@/entities/comment';
import { ReactionId } from '@/entities/reaction';
import { User } from '@/entities/user';

export type CommentReaction = {
  commentId: CommentId;
  reactionId: ReactionId;
  author: User['login'];
};
