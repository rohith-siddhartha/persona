import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from './mail.service';

@Processor('emails')
export class EmailProcessor {
  constructor(private readonly emailService: MailService) {}

  @Process('sendEmail')
  async sendEmail(job: Job<{ mail: string; text: string }>): Promise<void> {
    const { mail, text } = job.data;
    await this.emailService.sendMail(mail, 'Mail from Rohith', text);
  }
}
