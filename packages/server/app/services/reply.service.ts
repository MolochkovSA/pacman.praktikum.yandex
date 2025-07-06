import { CreateReplyDto } from '../dto/reply.dto';
import { Reply } from '../models/reply.model';

export class ReplyService {
  async createReply(replyDto: CreateReplyDto) {
    await Reply.create({
      text: replyDto.text,
      author: replyDto.author,
      commentId: replyDto.commentId,
      parentId: replyDto.parentId
    });
  }

  async getReplyById(parentId: number) {
    return await Reply.findOne({
      where: {
        id: parentId
      }
    });
  }
}
