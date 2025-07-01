import { Comment } from '../models/comment.model';
import { CommentDto, LastCommentInfoDto } from '../dto/comment.dto';
import { ReplyMapper } from './reply.mapper';
import { ReactionMapper } from './reaction.mapper';

export class CommentMapper {
  private _replyMapper: ReplyMapper;
  private _reactionMapper: ReactionMapper;

  constructor() {
    this._replyMapper = new ReplyMapper();
    this._reactionMapper = new ReactionMapper();
  }

  commentModelToLastDto(comment?: Comment): LastCommentInfoDto | null {
    if (!comment) {
      return null;
    }

    return {
      author: comment.author,
      createdAt: comment.createdAt
    };
  }

  commentModelToDto(comment: Comment): CommentDto {
    return {
      author: comment.author,
      createdAt: comment.createdAt,
      text: comment.text,
      replies: this._replyMapper.repliesModelToDto(comment.replies),
      reactions: this._reactionMapper.reactionsModelToDto(comment.commentReactions)
    };
  }

  commentsModelToDto(comments?: Comment[]): CommentDto[] {
    if (!comments) {
      return [];
    }

    return comments.map((e) => this.commentModelToDto(e));
  }
}
