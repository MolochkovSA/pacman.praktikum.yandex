import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { ForumLayout } from '@/widgets/forum-layout';
import { Breadcrumbs, Button, Card, Input } from '@/shared/ui';
import { NewTopicType } from '../model/types';
import { topicSchema } from '../model/schema';

import './ForumPostingPage.scss';

export default function ForumPostingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewTopicType>({
    mode: 'onBlur',
    resolver: zodResolver(topicSchema)
  });
  const navigate = useNavigate();

  const onSubmit = (data: NewTopicType) => {
    console.log('данные формы:', data);
    navigate('/forum');
  };

  const onCancel = () => {
    navigate('/forum');
  };

  return (
    <ForumLayout
      top={
        <Breadcrumbs
          links={[
            { label: 'Главная', to: '/' },
            { label: 'Форум', to: '/forum' },
            { label: 'Новая тема', to: '/forum/posting' }
          ]}
        />
      }>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            className="h-25"
            {...register('text')}
            error={errors.text?.message as string}
          />
          <div className="d-flex justify-content-end gap-3">
            <Button
              variant="outline-secondary"
              onClick={onCancel}>
              Отмена
            </Button>
            <Button
              variant="secondary"
              type="submit">
              Создать тему
            </Button>
          </div>
        </form>
      </Card>
    </ForumLayout>
  );
}
