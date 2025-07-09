import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from 'react-bootstrap';

import { TopicId } from '@/entities/topic';
import { useComment } from '@/entities/comment';
import { Button, Input } from '@/shared/ui';
import { CommentData } from '../model/types';
import { commentSchema } from '../model/schema';

import './CreateCommentForm.scss';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/entities/user';

type Props = {
  topicId: TopicId;
  onSubmit?: (data: CommentData) => void;
};

export const CreateCommentForm = ({ topicId, onSubmit }: Props) => {
  const { isLoading, createComment } = useComment();
  const user = useSelector(userSelectors.selectUser);
  const { register, handleSubmit, reset, watch } = useForm<CommentData>({
    mode: 'onBlur',
    resolver: zodResolver(commentSchema)
  });

  const save = async (data: CommentData) => {
    if (!data.text) return;

    await createComment({ topicId, text: data.text, author: user?.login ? user?.login : '' });

    onSubmit?.(data);
    reset();
  };

  return (
    <Card>
      <Card.Body>
        <form onSubmit={handleSubmit(save)}>
          <Input
            as="textarea"
            label="Быстрый ответ"
            {...register('text')}
          />

          <div className="d-flex justify-content-end gap-3">
            <Button
              variant="outline-secondary"
              onClick={() => reset()}
              disabled={isLoading}>
              Очистить
            </Button>

            <Button
              type="submit"
              disabled={isLoading || !watch().text}>
              Отправить
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};
