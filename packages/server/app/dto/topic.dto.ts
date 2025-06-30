import { CommentDto, LastCommentInfoDto } from './comment.dto';

export interface CreateTopicDto {
  title: string;
  themeDescription: string;
  text: string;
  author: string;
}

export interface TopicDto {
  title: string;
  themeDescription: string;
  text: string;
  author: string;
  createdAt: string;
  comments: CommentDto[];
}

export interface TopicInfoDto {
  id: number;
  title: string;
  author: string;
  amountComments: number;
  lastComment: LastCommentInfoDto | null;
}
