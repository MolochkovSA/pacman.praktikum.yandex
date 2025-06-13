import { useLoaderData, useNavigate } from 'react-router-dom';

import { ForumLayout } from '@/widgets/forum-layout';
import { getTopicEditPath } from '@/shared/lib/router';
import { RoutePath } from '@/shared/config/routeConfig';
import { Breadcrumbs } from '@/shared/ui';
import { EditTopicForm } from '@/features/topic/edit';
import { Topic } from '@/entities/topic';

export const ForumTopicEditPage = () => {
  const navigate = useNavigate();
  const topic = useLoaderData<Topic | undefined>();

  const lastLink = topic
    ? { label: topic.title, to: getTopicEditPath(topic.id) }
    : { label: 'Новая тема', to: RoutePath.FORUM.POSTING };

  const goToForum = () => navigate(RoutePath.FORUM.ROOT);

  return (
    <ForumLayout
      top={
        <Breadcrumbs
          links={[{ label: 'Главная', to: RoutePath.MAIN }, { label: 'Форум', to: RoutePath.FORUM.ROOT }, lastLink]}
        />
      }>
      <EditTopicForm
        topic={topic}
        onSubmit={goToForum}
        onCancel={goToForum}
      />
    </ForumLayout>
  );
};
