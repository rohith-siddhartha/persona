import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Content } from 'src/entities/content.entity';
import { Subscriber } from 'src/entities/subscriber.entity';
import { Topic } from 'src/entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
    @InjectQueue('emails') private readonly emailQueue: Queue,
  ) {}

  async createContent(body: Partial<Content>): Promise<void> {
    const { time, text, topic } = body;

    const content = new Content();
    content.time = time;
    content.text = text;
    content.topic = topic;

    await this.contentRepository.save(content);

    const subscribers = await this.subscriberRepository
      .createQueryBuilder('subscriber')
      .innerJoin('subscriber.topics', 'topic', 'topic.id = :topicId', {
        topicId: topic,
      })
      .getMany();

    for (const subscriber of subscribers) {
      this.emailQueue.add(
        'sendEmail',
        { mail: subscriber.email, text },
        { delay: new Date(time).getTime() - Date.now() },
      );
    }
  }
}
