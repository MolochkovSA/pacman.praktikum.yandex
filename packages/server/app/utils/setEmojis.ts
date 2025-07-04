import { ReactionService } from '../services/reaction.service';

const reactionService = new ReactionService();

const emojis = [
  '😀',
  '😁',
  '😂',
  '🤣',
  '😃',
  '😄',
  '😅',
  '😊',
  '😇',
  '😉',
  '😍',
  '😘',
  '😗',
  '😜',
  '😎',
  '🤩',
  '🥳',
  '👍',
  '👎',
  '❤️',
  '🔥',
  '👏',
  '🙌',
  '🎉',
  '🤔',
  '😢',
  '😭',
  '😡',
  '🤯',
  '😱',
  '😴'
];

export const setEmojis = async () => {
  try {
    const existing = await reactionService.getAllReactions();
    const missing = emojis.filter((emoji) => existing.findIndex((e) => e.emoji === emoji) === -1);

    if (missing.length > 0) reactionService.addManyReactions(missing);
  } catch (error) {
    console.error(error);
  }
};
