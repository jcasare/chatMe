/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    CommonModule,
  ],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
