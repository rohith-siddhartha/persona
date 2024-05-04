import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from 'src/entities/subscriber.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
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
  ): Promise<void> {
    const subscriber = await this.subscriberRepository
      .createQueryBuilder('subscriber')
      .leftJoinAndSelect('subscriber.topics', 'topics')
      .where('subscriber.id = :id', { id: subscriberId })
      .getOne();
    if (!subscriber) {
      throw new Error(`Subscriber with ID ${subscriberId} not found`);
    }
    await this.subscriberRepository
      .createQueryBuilder()
      .relation(Subscriber, 'topics')
      .of(subscriber)
      .add(topicId);
  }
}
