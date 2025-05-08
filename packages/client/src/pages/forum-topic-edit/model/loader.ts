import { LoaderFunctionArgs } from 'react-router-dom';

import { topicApi } from '@/entities/topic';

export const topicLoader = ({ params: { topicId } }: LoaderFunctionArgs) => {
  if (!topicId) return null;

  return topicApi.getTopicByid(+topicId);
};
