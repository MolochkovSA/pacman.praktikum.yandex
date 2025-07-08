import { Card } from 'react-bootstrap';
import { CommentId } from '@/entities/comment';
import { CommentReaction } from '@/features/rection';
import { MessageType } from '../../model/types';
import { ReactionBlock } from '../ReactionBlock/ReactionBlock';

import styles from './MessageBlock.module.scss';

type Props = {
  type: MessageType;
  id: CommentId;
  themeDescription?: string;
  text: string;
  createdAt: Date;
  author: string;
  reactions?: CommentReaction[];
};

export const MessageBlock = ({ type, id, themeDescription, text, createdAt, author, reactions }: Props) => {
  return (
    <Card>
      <Card.Body className={styles.messageBlock}>
        <div className={styles.author}>
          <span>{author}</span>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.content}>
          <time>{createdAt.toLocaleString()}</time>
          {type === 'topic' && themeDescription && <h3>{themeDescription}</h3>}
          <p>{text}</p>
          {type === 'comment' && (
            <ReactionBlock
              commentId={id}
              reactions={reactions || []}
            />
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
