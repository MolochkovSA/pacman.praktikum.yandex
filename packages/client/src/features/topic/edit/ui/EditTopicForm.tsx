import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from 'react-bootstrap';

import { Topic, useTopic } from '@/entities/topic';
import { Button, Input } from '@/shared/ui';
import { topicSchema } from '../model/schema';
import { TopicData } from '../model/types';

import './EditTopicForm.scss';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/entities/user';
// const authorId = 1; // TODO: сделать авторизацию

type Props = {
  topic?: Topic;
  onSubmit: (data: TopicData) => void;
  onCancel: () => void;
};

export const EditTopicForm = ({ topic, onSubmit, onCancel }: Props) => {
  const { isLoading, createTopic, updateTopic } = useTopic();
  const user = useSelector(userSelectors.selectUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TopicData>({
    mode: 'onBlur',
    resolver: zodResolver(topicSchema),
    defaultValues: topic
  });

  const save = async (data: TopicData) => {
    console.log('user', user);
    if (topic) {
      await updateTopic({ topicId: topic.id, topic: data });
    } else {
      if (user) {
        await createTopic({ author: user?.id, ...data });
      }
    }

    onSubmit(data);
    reset();
  };

  return (
    <Card>
      <Card.Body>
        <form
          id="posting"
          onSubmit={handleSubmit(save)}>
          <Input
            label="Заголовок"
            {...register('title')}
            error={errors.title?.message as string}
          />
          <Input
            label="Описание темы"
            {...register('themeDescription')}
            error={errors.themeDescription?.message as string}
          />
          <Input
            as="textarea"
            label="Текст сообщения/темы"
            {...register('text')}
            error={errors.text?.message as string}
          />
        </form>
      </Card.Body>

      <Card.Footer className="d-flex justify-content-end gap-3">
        <Button
          variant="outline-secondary"
          onClick={onCancel}
          disabled={isLoading}>
          Отмена
        </Button>
        <Button
          form="posting"
          type="submit"
          disabled={isLoading}>
          {topic ? 'Изменить' : 'Создать'}
        </Button>
      </Card.Footer>
    </Card>
  );
};
