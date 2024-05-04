import { Body, Controller, Get, Post } from '@nestjs/common';
import { Topic } from 'src/entities/topic.entity';
import { TopicService } from 'src/services/topic/topic.service';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async findAll(): Promise<Topic[]> {
    return this.topicService.findAll();
  }

  @Post()
  async create(@Body() topicData: Partial<Topic>): Promise<Topic> {
    return this.topicService.create(topicData);
  }
}
