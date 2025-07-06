import { Request, Response } from 'express';
import { ReactionService } from '../services/reaction.service';
import { CreateReactionDto, DeleteReactionDto } from '../dto/reaction.dto';

const reactionService = new ReactionService();

export const getAllReaction = async (_: Request, res: Response) => {
  const reactions = await reactionService.getAllReactions();

  return res.status(200).json(reactions);
};

export const addReactionByComment = async (req: Request, res: Response) => {
  const { commentId, reactionId, author } = req.body as CreateReactionDto;

  await reactionService.setReaction(commentId, reactionId, author);

  return res.status(201).json();
};

export const deleteReactionByComment = async (req: Request, res: Response) => {
  const { commentId, reactionId } = req.body as DeleteReactionDto;

  await reactionService.deleteReaction(commentId, reactionId);

  return res.status(204).json();
};
