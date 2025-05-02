import { ForumLayout } from '@/widgets/forum-layout';
import { Pagination } from '@/widgets/pagination';
import { Card } from '@/shared/ui';
import { NewTopicButton } from './NewTopicButton/NewTopicButton';
import { TopicsTable } from './TopicsTable/TopicsTable';

export default function ForumPage() {
  return (
    <ForumLayout
      title="Форум"
      actions={<NewTopicButton />}>
      <Card>
        <TopicsTable />
        <Pagination
          page={1}
          total={100}
          limit={10}
          onNextClick={() => {}}
          onPrevClick={() => {}}
        />
      </Card>
    </ForumLayout>
  );
}
