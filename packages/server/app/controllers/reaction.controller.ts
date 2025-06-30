import { Request, Response } from 'express';
import { ReactionService } from '../services/reaction.service';

const reactionService = new ReactionService();

export const getAllReaction = async (_: Request, res: Response) => {
  const reactions = await reactionService.getAllReactions();

  return res.status(201).json(reactions);
};

export const addReactionByComment = async (req: Request, res: Response) => {
  const { commentId, reactionId, author } = req.query as { commentId: string; reactionId: string; author: string };

  await reactionService.setReaction(Number(commentId), Number(reactionId), author);

  return res.status(201).json();
};

export const addReaction = async (req: Request, res: Response) => {
  const { emoji } = req.body;

  await reactionService.addReaction(emoji);

  return res.status(201).json();
};

export const deleteReactionByComment = async (req: Request, res: Response) => {
  const { commentId, reactionId } = req.query as { commentId: string; reactionId: string };

  await reactionService.deleteReaction(Number(commentId), Number(reactionId));

  return res.status(201).json();
};
