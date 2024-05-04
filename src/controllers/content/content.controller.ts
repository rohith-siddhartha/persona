import { Body, Controller, Post } from '@nestjs/common';
import { Content } from 'src/entities/content.entity';
import { ContentService } from 'src/services/content/content.service';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  async createContent(@Body() body: Partial<Content>): Promise<void> {
    await this.contentService.createContent(body);
  }
}
