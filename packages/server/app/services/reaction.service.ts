import { Reaction } from '../models/reaction.model';
import { CommentReaction } from '../models/comment_reactions.model';

export class ReactionService {
  async getAllReactions() {
    return await Reaction.findAll();
  }

  async setReaction(commentId: number, reactionId: number, author: string) {
    await CommentReaction.create({ commentId, author, reactionId });
  }

  async deleteReaction(commentId: number, reactionId: number, author: string) {
    await CommentReaction.destroy({ where: { commentId, author, reactionId } });
  }

  async addManyReactions(emojis: string[]) {
    await Reaction.bulkCreate(emojis.map((emoji) => ({ emoji })));
  }
}
