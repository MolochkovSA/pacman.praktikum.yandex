import { ReactionDto } from '../dto/reaction.dto';
import { CommentReaction } from '../models/comment_reactions.model';

export class ReactionMapper {
  reactionModelToDto(reaction: CommentReaction): ReactionDto {
    return {
      commentId: reaction.commentId,
      reactionId: reaction.reactionId,
      author: reaction.author,
      createdAt: reaction.createdAt
    };
  }

  reactionsModelToDto(reactions?: CommentReaction[]): ReactionDto[] {
    if (!reactions || reactions.length === 0) {
      return [];
    }

    return reactions.map((e) => this.reactionModelToDto(e));
  }
}
