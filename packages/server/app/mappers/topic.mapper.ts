import { TopicDto, TopicInfoDto } from '../dto/topic.dto';
import { Topic } from '../models/topic.model';
import { CommentMapper } from './comment.mapper';

export class TopicMapper {
  private _commentMapper: CommentMapper;

  constructor() {
    this._commentMapper = new CommentMapper();
  }

  topicsModelToDto(topics: Topic[]): TopicInfoDto[] {
    return topics.map((e) => {
      return {
        id: e.id,
        title: e.title,
        author: e.author,
        amountComments: e.comments ? e.comments.length : 0,
        lastComment: this._commentMapper.commentModelToLastDto(e.comments?.sort((a, b) => b.id - a.id)?.[0])
      };
    });
  }

  topicModelToDto(topic: Topic): TopicDto {
    return {
      title: topic.title,
      author: topic.author,
      themeDescription: topic.themeDescription,
      createdAt: topic.createdAt,
      text: topic.text,
      comments: this._commentMapper.commentsModelToDto(topic.comments)
    };
  }
}
