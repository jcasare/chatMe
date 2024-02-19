/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { CommonService } from '@app/common';
import { StatusService } from './status.service';

@Controller()
export class StatusController {
  constructor(
    private readonly statusService: StatusService,
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'get-status' })
  async getStatus(@Ctx() context: RmqContext) {
    this.commonService.ackMessage(context);
    return this.statusService.getStatus();
  }

  @MessagePattern({ cmd: 'set-status' })
  async createStatus(@Ctx() context: RmqContext) {
    this.commonService.ackMessage(context);
    return this.statusService.createStatus();
  }
}
