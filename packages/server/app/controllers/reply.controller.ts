import { Request, Response } from 'express';
import { ReplyService } from '../services/reply.service';
import { CreateReplyDto } from '../dto/reply.dto';
import { CommentService } from '../services/comment.service';

const replyService = new ReplyService();
const commentService = new CommentService();

export const createReply = async (req: Request, res: Response) => {
  const createReplyDto = req.body as CreateReplyDto;

  if (createReplyDto.commentId) {
    const comment = await commentService.getCommentById(createReplyDto.commentId);

    if (comment) {
      await replyService.createReply(createReplyDto);

      return res.status(201).json({ message: 'Reply created' });
    }
  }

  if (createReplyDto.parentId) {
    const reply = await replyService.getReplyById(createReplyDto.parentId);

    if (reply) {
      await replyService.createReply(createReplyDto);

      return res.status(201).json({ message: 'Reply created' });
    }
  }

  return res.status(404).json({ message: 'Comment not found' });
};
