import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Subscriber } from 'src/entities/subscriber.entity';
import { SubscriberService } from 'src/services/subscriber/subscriber.service';

@Controller('subscribers')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Get()
  async findAll(): Promise<Subscriber[]> {
    return this.subscriberService.findAll();
  }

  @Post()
  async create(
    @Body() subscriberData: Partial<Subscriber>,
  ): Promise<Subscriber> {
    return this.subscriberService.create(subscriberData);
  }

  @Post(':id/subscribe/:topicId')
  async subscribeUserForTopic(
    @Param('id') id: number,
    @Param('topicId') topicId: number,
  ): Promise<void> {
    return this.subscriberService.subscribeUserForTopic(id, topicId);
  }
}
