import { Reaction } from '../models/reaction.model';
import { CommentReaction } from '../models/comment_reactions.model';

export class ReactionService {
  async getAllReactions() {
    return await Reaction.findAll();
  }

  async setReaction(commentId: number, reactionId: number, author: string) {
    await CommentReaction.create({
      commentId: commentId,
      author: author,
      reactionId: reactionId
    });
  }

  async deleteReaction(commentId: number, reactionId: number) {
    await CommentReaction.destroy({
      where: {
        commentId: commentId,
        reactionId: reactionId
      }
    });
  }

  async addReaction(emoji: string) {
    await Reaction.create({
      emoji
    });
  }

  async addManyReactions(emojis: string[]) {
    await Reaction.bulkCreate(emojis.map((emoji) => ({ emoji })));
  }
}
