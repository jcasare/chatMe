import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    CommonModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    CommonModule.registerRmq(
      'STATUS_SERVICE',
      process.env.RABBITMQ_STATUS_QUEUE,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
