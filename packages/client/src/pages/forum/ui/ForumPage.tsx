import { Card } from 'react-bootstrap';
import { ForumLayout } from '@/widgets/forum-layout';
import { Pagination } from '@/widgets/pagination';
import { Breadcrumbs } from '@/shared/ui';
import { NewTopicButton } from './NewTopicButton/NewTopicButton';
import { TopicsTable } from './TopicsTable/TopicsTable';

export default function ForumPage() {
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

        <Card.Body>
          <TopicsTable />
        </Card.Body>

        <Card.Footer>
          <Pagination
            page={1}
            total={100}
            limit={10}
            onNextClick={() => {}}
            onPrevClick={() => {}}
          />
        </Card.Footer>
      </Card>
    </ForumLayout>
  );
}
