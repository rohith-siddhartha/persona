import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  async findAll(): Promise<Topic[]> {
    return this.topicRepository.find();
  }

  async create(topicData: Partial<Topic>): Promise<Topic> {
    const topic = this.topicRepository.create(topicData);
    return this.topicRepository.save(topic);
  }
}
