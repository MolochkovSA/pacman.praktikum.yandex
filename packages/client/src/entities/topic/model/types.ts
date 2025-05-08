export type TopicId = number;

export type TopicContent = {
  title: string;
  themeDescription: string;
  text: string;
};

export type Topic = TopicContent & { id: TopicId; createdAt: Date };

export type TopicResponseDto = TopicContent & { id: TopicId; createdAt: string };

export type TopicListResponseDto = {
  topics: TopicResponseDto[];
  total: number;
};

export type CreateTopicRequestDto = {
  authorId: number;
  topic: TopicContent;
};

export type UpdateTopicRequestDto = {
  topicId: TopicId;
  topic: Partial<TopicContent>;
};
