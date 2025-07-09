import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { GiTrophyCup } from 'react-icons/gi';
import { GiLibertyWing } from 'react-icons/gi';

import { RoutePath } from '@/shared/config/routeConfig';
import { Breadcrumbs, Spinner } from '@/shared/ui';
import { ForumLayout } from '@/widgets/forum-layout';
import { Pagination } from '@/widgets/pagination';
import { usePlayerList } from '../hooks/usePlayerList';
import { DEFAULT_PAGE, DEFAULT_PLAYERS_ON_SCREEN } from '../constants';
import { PlayersTable } from './PlayersTable/PlayersTable';
import { ErrorMessage } from '@/shared/ui';

import styles from './LeaderBoardPage.module.scss';

export const LeaderBoardPage = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);

  const { players, isLoading, isError } = usePlayerList(page);
  const length = players?.length ?? 0;
  return (
    <ForumLayout
      top={
        <>
          <Breadcrumbs
            links={[
              { label: 'Главная', to: RoutePath.MAIN },
              { label: 'Таблица лидеров', to: RoutePath.LEADERBOARD }
            ]}
          />
        </>
      }>
      <Card>
        <Card.Header>
          <Card.Title className={styles.title}>
            <GiTrophyCup size={64} />
            <GiLibertyWing
              size={64}
              className={styles.flipHorizontal}
            />

            <span> LeaderBoard </span>

            <GiLibertyWing size={64} />
            <GiTrophyCup size={64} />
          </Card.Title>
        </Card.Header>
        {isError ? (
          <ErrorMessage error={'Произошла ошибка, пожалуйста, обновите страницу'}></ErrorMessage>
        ) : (
          <Card.Body>{isLoading ? <Spinner /> : <PlayersTable players={players} />}</Card.Body>
        )}

        <Card.Footer>
          <Pagination
            page={page}
            limit={DEFAULT_PLAYERS_ON_SCREEN}
            total={length}
            onNextClick={() => setPage((prev) => prev + 1)}
            onPrevClick={() => setPage((prev) => prev - 1)}
          />
        </Card.Footer>
      </Card>
    </ForumLayout>
  );
};
