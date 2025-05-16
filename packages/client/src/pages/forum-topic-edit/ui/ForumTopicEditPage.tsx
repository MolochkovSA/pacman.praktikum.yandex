import { useLoaderData, useNavigate } from 'react-router-dom';

import { ForumLayout } from '@/widgets/forum-layout';
import { Breadcrumbs } from '@/shared/ui';
import { EditTopicForm } from '@/features/topic/edit';
import { Topic } from '@/entities/topic';

export const ForumTopicEditPage = () => {
  const navigate = useNavigate();
  const topic = useLoaderData<Topic | undefined>();

  const lastLink = topic
    ? { label: topic.title, to: `/forum/${topic.id}/edit` }
    : { label: 'Новая тема', to: '/forum/posting' };

  const goToForum = () => navigate('/forum');

  return (
    <ForumLayout
      top={<Breadcrumbs links={[{ label: 'Главная', to: '/' }, { label: 'Форум', to: '/forum' }, lastLink]} />}>
      <EditTopicForm
        topic={topic}
        onSubmit={goToForum}
        onCancel={goToForum}
      />
    </ForumLayout>
  );
};
