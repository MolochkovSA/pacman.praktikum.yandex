import { useState } from 'react';
import { Card } from 'react-bootstrap';

import { ForumLayout } from '@/widgets/forum-layout';
import { Pagination } from '@/widgets/pagination';
import { Breadcrumbs, Spinner } from '@/shared/ui';
import { NewTopicButton } from './NewTopicButton/NewTopicButton';
import { TopicsTable } from './TopicsTable/TopicsTable';
import { DEFAULT_PAGE, DEFAULT_TOPICS_ON_SCREEN } from '../constants';
import { useTopicList } from '../hooks/useTopicList';

export const ForumPage = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const { topics, isLoading, total } = useTopicList(page);

  return (
    <ForumLayout
      top={
        <>
          <Breadcrumbs
            links={[
              { label: 'Главная', to: '/' },
              { label: 'Форум', to: '/forum' }
            ]}
          />
          <NewTopicButton />
        </>
      }>
      <Card>
        <Card.Header>
          <Card.Title>Пристанище словоблуда</Card.Title>
        </Card.Header>

        <Card.Body>{isLoading ? <Spinner /> : <TopicsTable topics={topics} />}</Card.Body>

        <Card.Footer>
          <Pagination
            page={page}
            total={total}
            limit={DEFAULT_TOPICS_ON_SCREEN}
            onNextClick={() => setPage((prev) => prev + 1)}
            onPrevClick={() => setPage((prev) => prev - 1)}
          />
        </Card.Footer>
      </Card>
    </ForumLayout>
  );
};
