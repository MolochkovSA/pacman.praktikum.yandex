import { Request, Response } from 'express';
import * as console from 'node:console';
import { CreateTopicDto } from '../dto/topic.dto';
import { TopicService } from '../services/topic.service';
import { TopicMapper } from '../mappers/topic.mapper';

const topicService = new TopicService();
const topicMapper = new TopicMapper();

export const getTopic = (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id);

  res.status(201).json({ message: 'Topic get' });
};

export const createTopic = async (req: Request, res: Response) => {
  const createTopicDto = req.body as CreateTopicDto;

  await topicService.createTopic(createTopicDto);

  return res.status(201).json({ message: 'Topic created' });
};

export const getTopicsByAmountAndPage = async (req: Request, res: Response) => {
  try {
    const { amount, page } = req.query as { amount: string; page: string };

    if (!amount || !page) {
      return res.status(500).json({ message: 'Invalid amount' });
    }

    const topics = await topicService.getTopicsByAmountAndPage(Number(amount), Number(page));

    const responseBody = topicMapper.topicsModelToDto(topics);

    return res.status(201).json(responseBody);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getTopicById = async (req: Request, res: Response) => {
  const { topicId } = req.query as { topicId: string };

  const topic = await topicService.getTopicById(Number(topicId));

  if (topic) {
    const topicDto = topicMapper.topicModelToDto(topic);

    return res.status(201).json(topicDto);
  }

  return res.status(404).json({ message: 'Topic not found' });
};
