import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Content } from './entities/content.entity';
import { Subscriber } from './entities/subscriber.entity';
import { TopicController } from './controllers/topic/topic.controller';
import { TopicService } from './services/topic/topic.service';
import { SubscriberController } from './controllers/subscriber/subscriber.controller';
import { SubscriberService } from './services/subscriber/subscriber.service';
import { BullModule } from '@nestjs/bull';
import { ContentController } from './controllers/content/content.controller';
import { ContentService } from './services/content/content.service';
import { MailService } from './services/mail/mail.service';
import { EmailProcessor } from './services/mail/mail.processor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DB_URL'),
        port: configService.get<number>('DB_PORT'),
        entities: [Topic, Content, Subscriber],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    TypeOrmModule.forFeature([Topic, Subscriber, Content]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: configService.get<string>('REDIS_URL'),
      }),
    }),
    BullModule.registerQueue({
      name: 'emails',
    }),
  ],
  controllers: [
    AppController,
    TopicController,
    SubscriberController,
    ContentController,
  ],
  providers: [
    AppService,
    TopicService,
    SubscriberService,
    ContentService,
    MailService,
    EmailProcessor,
  ],
})
export class AppModule {}
