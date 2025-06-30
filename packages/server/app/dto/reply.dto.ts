export interface CreateReplyDto {
  commentId?: number;
  parentId?: number;
  author: string;
  text: string;
}

export interface ReplyDto {
  author: string;
  text: string;
  createdAt: string;
  children: ReplyDto[];
}
