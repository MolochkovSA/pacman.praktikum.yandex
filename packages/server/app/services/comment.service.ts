import { CreateCommentDto } from '../dto/comment.dto';
import { Comment } from '../models/comment.model';

export class CommentService {
  async createComment(commentDto: CreateCommentDto) {
    return await Comment.create({
      text: commentDto.text,
      author: commentDto.author,
      topicId: commentDto.topicId
    });
  }

  async getCommentById(commentId: number) {
    return await Comment.findOne({
      where: {
        id: commentId
      }
    });
  }
}
