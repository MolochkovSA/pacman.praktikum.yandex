export interface CreateReactionDto {
  commentId: number;
  reactionId: number;
  author: string;
}

export interface ReactionDto {
  commentId: number;
  reactionId: number;
  author: string;
  createdAt: string;
}

export interface DeleteReactionDto {
  commentId: number;
  reactionId: number;
  author: string;
}
