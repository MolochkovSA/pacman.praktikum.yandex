import { Reply } from '../models/reply.model';
import { ReplyDto } from '../dto/reply.dto';

export class ReplyMapper {
  replyModelToDto(reply: Reply): ReplyDto {
    return {
      author: reply.author,
      createdAt: reply.createdAt,
      text: reply.text,
      children: this.repliesModelToDto(reply.children)
    };
  }

  repliesModelToDto(replies?: Reply[]): ReplyDto[] {
    if (!replies || replies.length === 0) {
      return [];
    }

    return replies.map((e) => this.replyModelToDto(e));
  }
}
