import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig';
import { Breadcrumbs, Spinner } from '@/shared/ui';
import { getTopicPath } from '@/shared/lib/router';
import { ForumLayout } from '@/widgets/forum-layout';
import { Pagination } from '@/widgets/pagination';
import { CreateCommentForm } from '@/features/comment/create';
import { MessageBlock } from './MessageBlock/MessageBlock';
import { useTopicView } from '../hooks/useTopicView';
import { DEFAULT_COMMENTS_ON_SCREEN, DEFAULT_PAGE } from '../constants';

import styles from './ForumTopicViewPage.module.scss';

export const ForumTopicViewPage = () => {
  const { topicId } = useParams();
  const id = Number(topicId);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const { isLoading, topic, comments, total } = useTopicView(id);
  const visibleComments = comments.slice((page - 1) * DEFAULT_COMMENTS_ON_SCREEN, page * DEFAULT_COMMENTS_ON_SCREEN);
  const messages = visibleComments.map((comment) => (
    <MessageBlock
      key={comment.id}
      type="comment"
      id={comment.id}
      text={comment.text}
      createdAt={comment.createdAt}
      author={comment.author}
      reactions={comment.reactions}
    />
  ));

  const paginationCard = (
    <Card className="p-1">
      {/* <Pagination
        page={page}
        total={total}
        limit={DEFAULT_COMMENTS_ON_SCREEN}
        onNextClick={() => setPage((prev) => prev + 1)}
        onPrevClick={() => setPage((prev) => prev - 1)}
      /> */}
      <Pagination
        page={page}
        total={total}
        limit={DEFAULT_COMMENTS_ON_SCREEN}
        onNextClick={() => {
          if (page < Math.ceil(total / DEFAULT_COMMENTS_ON_SCREEN)) {
            setPage((prev) => prev + 1);
          }
        }}
        onPrevClick={() => {
          if (page > 1) {
            setPage((prev) => prev - 1);
          }
        }}
      />
    </Card>
  );

  return (
    <ForumLayout
      top={
        <Breadcrumbs
          links={[
            { label: 'Главная', to: RoutePath.MAIN },
            { label: 'Форум', to: RoutePath.FORUM.ROOT },
            { label: topic?.title ?? `Топик ${id}`, to: getTopicPath(String(id)) }
          ]}
        />
      }>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div className={styles.messages}>
          {paginationCard}
          {topic && page === DEFAULT_PAGE && (
            <MessageBlock
              type="topic"
              id={topic.id}
              text={topic.text}
              themeDescription={topic.themeDescription}
              createdAt={topic.createdAt}
              author={topic.author}
              reactions={[]}
            />
          )}
          {messages}

          {paginationCard}

          <CreateCommentForm
            topicId={id}
            //  onSubmit={loadTopicView}
          />
        </div>
      )}
    </ForumLayout>
  );
};
