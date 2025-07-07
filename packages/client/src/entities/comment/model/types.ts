export type CommentId = number;

export type Comment = {
  id: number;
  text: string;
  createdAt: Date;
};

export type CreateCommentRequestDto = {
  topicId: number;
  text: string;
  author: string;
};
