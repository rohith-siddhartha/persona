import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from 'src/entities/subscriber.entity';
import { Topic } from 'src/entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  async findAll(): Promise<Subscriber[]> {
    return this.subscriberRepository.find();
  }

  async create(subscriberData: Partial<Subscriber>): Promise<Subscriber> {
    const subscriber = this.subscriberRepository.create(subscriberData);
    return this.subscriberRepository.save(subscriber);
  }

  async subscribeUserForTopic(
    subscriberId: number,
    topicId: number,
  ): Promise<string> {
    const subscriber = await this.subscriberRepository
      .createQueryBuilder('subscriber')
      .leftJoinAndSelect('subscriber.topics', 'topics')
      .where('subscriber.id = :id', { id: subscriberId })
      .getOne();

    if (!subscriber) {
      throw new Error(`Subscriber with ID ${subscriberId} not found`);
    }

    const topic = await this.topicRepository
      .createQueryBuilder('topic')
      .where('topic.id = :id', { id: topicId })
      .getOne();

    if (!topic) {
      throw new Error(`Topic with ID ${topicId} not found`);
    }

    await this.subscriberRepository
      .createQueryBuilder()
      .relation(Subscriber, 'topics')
      .of(subscriber)
      .add(topicId);

    return `subscriber ${subscriber.email} subscribed successfully to topic ${topic.name}`;
  }
}
