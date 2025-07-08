export type TopicId = number;

type TopicContent = {
  title: string;
  themeDescription: string;
  text: string;
};

export type Topic = TopicContent & { id: TopicId; createdAt: Date };

export type CreateTopicRequestDto = TopicContent & {
  author: string;
};

export type UpdateTopicRequestDto = {
  topicId: TopicId;
  topic: Partial<TopicContent>;
};
