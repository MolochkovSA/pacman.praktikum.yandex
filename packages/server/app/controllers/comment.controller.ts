import { Request, Response } from 'express';
import { CreateCommentDto } from '../dto/comment.dto';
import { CommentService } from '../services/comment.service';
import { TopicService } from '../services/topic.service';

const commentService = new CommentService();
const topicService = new TopicService();

export const createComment = async (req: Request, res: Response) => {
  const createCommentDto = req.body as CreateCommentDto;

  const topic = await topicService.getTopicById(createCommentDto.topicId);

  if (topic) {
    await commentService.createComment(createCommentDto);

    console.error(topic.comments);
    return res.status(201).json({ message: 'Comment created' });
  }

  return res.status(404).json({ message: 'Topic not found' });
};
