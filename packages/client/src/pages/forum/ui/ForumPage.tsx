import { ForumLayout } from '@/widgets/forum-layout';
import styles from './ForumPage.module.scss';
import { Button, Card, Input } from '@/shared/ui';
import { NewTopicButton } from './NewTopicButton/NewTopicButton';

type Props = {};

export const ForumPage = () => {
  return (
    <ForumLayout
      title="Форум"
      actions={<NewTopicButton />}>
      <div>topics</div>
    </ForumLayout>
  );
};
