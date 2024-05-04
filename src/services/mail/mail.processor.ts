import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from './mail.service';
import { ContentService } from '../content/content.service';

@Processor('emails')
export class EmailProcessor {
  constructor(
    private readonly emailService: MailService,
    private readonly contentService: ContentService,
  ) {}

  @Process('sendEmail')
  async sendEmail(
    job: Job<{ mail: string; contentId: number }>,
  ): Promise<void> {
    const { mail, contentId } = job.data;
    const contentText = await this.contentService.getContentTextById(contentId);
    await this.emailService.sendMail(mail, 'Mail from Rohith', contentText);
  }
}
