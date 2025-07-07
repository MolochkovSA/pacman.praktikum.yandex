import { Topic } from '../models/topic.model';
import { CreateTopicDto } from '../dto/topic.dto';
import { Comment } from '../models/comment.model';
import { Reply } from '../models/reply.model';
import { CommentReaction } from '../models/comment_reactions.model';

export class TopicService {
  async createTopic(topicDto: CreateTopicDto) {
    await Topic.create({
      title: topicDto.title,
      themeDescription: topicDto.themeDescription,
      text: topicDto.text,
      author: topicDto.author
    });
  }

  async getTopicById(topicId: number) {
    return await Topic.findOne({
      where: {
        id: topicId
      },
      include: [
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: Reply,
              as: 'replies',
              include: [
                {
                  model: Reply,
                  as: 'children'
                }
              ]
            },
            {
              model: CommentReaction
            }
          ]
        }
      ]
    });
  }

  async getTopicsByAmountAndPage(amount: number, page: number) {
    return await Topic.findAll({
      offset: page * amount,
      limit: amount,
      order: [['id', 'ASC']],
      include: [
        {
          model: Comment,
          as: 'comments'
        }
      ]
    });
  }
}
