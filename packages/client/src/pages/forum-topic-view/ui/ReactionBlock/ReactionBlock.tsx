import { useCallback, useMemo, useState } from 'react';

import { CommentId } from '@/entities/comment';
import { useAuth } from '@/features/auth';
import { Reaction, ReactionId, useReactionsList } from '@/entities/reaction';
import { addReaction, deleteReaction } from '@/features/rection';
import { CommentReaction } from '@/features/rection';
import { ReactionDropdown } from '../ReactionDropdown/ReactionDropdown';

import styles from './ReactionBlock.module.scss';

type Props = {
  commentId: CommentId;
  reactions: CommentReaction[];
};

export const ReactionBlock = ({ commentId, reactions: currentReactions }: Props) => {
  const { user } = useAuth();
  const { reactionsList, isLoading } = useReactionsList();
  const [reactions, setReactions] = useState<CommentReaction[]>(currentReactions);

  const handleAddReaction = useCallback(
    (reactionId: ReactionId) => {
      const author = user?.login;

      if (!author) return;

      const newreaction = { commentId, reactionId, author };
      addReaction(newreaction)
        .then(() => setReactions((prev) => [newreaction, ...prev]))
        .catch(console.error);
    },
    [commentId, user]
  );

  const handleDeleteReaction = useCallback(
    (reactionId: ReactionId, author: string) => {
      deleteReaction({ commentId, reactionId, author })
        .then(() => {
          setReactions((prev) =>
            prev.filter((reaction) => reaction.reactionId !== reactionId || reaction.author !== author)
          );
        })
        .catch(console.error);
    },
    [commentId]
  );

  const handleClick = useCallback(
    ({ reactionId, authors }: { reactionId: ReactionId; authors: string[] }) => {
      if (!user) return;

      if (authors.includes(user.login)) {
        handleDeleteReaction(reactionId, user.login);
      } else {
        handleAddReaction(reactionId);
      }
    },
    [user, handleDeleteReaction, handleAddReaction]
  );

  const gruppedReactions = useMemo(
    () =>
      reactions.reduce<Record<number, { emoji: string; total: number; authors: string[] }>>(
        (acc, { reactionId, author }) => {
          if (acc[reactionId]) {
            acc[reactionId].total += 1;
            acc[reactionId].authors.push(author);
          } else {
            acc[reactionId] = {
              emoji: reactionsList.find((r) => r.id === reactionId)?.emoji || '',
              total: 1,
              authors: [author]
            };
          }

          return acc;
        },
        {}
      ),
    [reactions, reactionsList]
  );

  const availableReactions: Reaction[] = useMemo(() => {
    const filteredReactions = [...reactions].filter((r) => r.author === user?.login);

    return reactionsList.filter((r) => !filteredReactions.find((rr) => rr.reactionId === r.id));
  }, [reactions, user, reactionsList]);

  return (
    <div className={styles.container}>
      <div className={styles.reactions}>
        {Object.entries(gruppedReactions)
          .sort(([, a], [, b]) => b.total - a.total)
          .map(([reactionId, { emoji, authors, total }]) => (
            <div
              key={reactionId}
              className={styles.reaction}
              onClick={() => handleClick({ reactionId: Number(reactionId), authors })}>
              {total > 1 && <span className={styles.total}>{total}</span>}
              <span className={styles.emoji}>{emoji}</span>
            </div>
          ))}
      </div>

      {!isLoading && reactionsList.length > 0 && (
        <ReactionDropdown
          reactionsList={availableReactions}
          onAddReaction={handleAddReaction}
        />
      )}
    </div>
  );
};
