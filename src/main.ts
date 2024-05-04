import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(new Date(Date.now()));
  await app.listen(3000);
}
bootstrap();
