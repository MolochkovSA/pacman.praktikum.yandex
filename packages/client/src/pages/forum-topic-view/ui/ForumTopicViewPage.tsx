import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { Breadcrumbs, Pagination, Spinner } from '@/shared/ui';
import { ForumLayout } from '@/widgets/forum-layout';
import { MessageBlock } from './MessageBlock/MessageBlock';
import { useTopicView } from '../hooks/useTopicView';
import { DEFAULT_COMMENTS_ON_SCREEN, DEFAULT_PAGE } from '../constants';

import styles from './ForumTopicViewPage.module.scss';

export const ForumTopicViewPage = () => {
  const { topicId } = useParams();
  const id = Number(topicId);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const { isLoading, topic, comments, total } = useTopicView(id, page);

  const messages = comments.map((comment) => (
    <MessageBlock
      key={comment.id}
      {...comment}
    />
  ));

  const paginationCard = (
    <Card className="p-1">
      <Pagination
        page={page}
        total={total}
        limit={DEFAULT_COMMENTS_ON_SCREEN}
        onNextClick={() => setPage((prev) => prev + 1)}
        onPrevClick={() => setPage((prev) => prev - 1)}
      />
    </Card>
  );

  return (
    <ForumLayout
      top={
        <Breadcrumbs
          links={[
            { label: 'Главная', to: '/' },
            { label: 'Форум', to: '/forum' },
            { label: topic?.title ?? `Топик ${id}`, to: `/forum/${id}` }
          ]}
        />
      }>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div className={styles.messages}>
          {paginationCard}

          {topic && page === DEFAULT_PAGE && <MessageBlock {...topic} />}

          {messages}

          {paginationCard}
        </div>
      )}
    </ForumLayout>
  );
};
