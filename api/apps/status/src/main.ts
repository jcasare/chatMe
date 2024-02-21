import { NestFactory } from '@nestjs/core';
import { StatusModule } from './status.module';
import { ConfigService } from '@nestjs/config';
import { CommonService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(StatusModule);
  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);
  const queue = configService.get('RABBITMQ_STATUS_QUEUE');
  app.connectMicroservice(commonService.getRmqOptions(queue));
  await app.startAllMicroservices();
}
bootstrap();
