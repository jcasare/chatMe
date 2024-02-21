import { Controller, Inject, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CommonService } from '@app/common';
import { NewUserDto } from './dtos/new-user.dto';
import { ExistingUserDto } from './dtos/existing-user.dto';
import { JwtGuard } from './guards/jwt.guard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@Controller()
export class AuthController {
  constructor(
    @Inject('AuthServiceInterface') private readonly authService: AuthService,
    @Inject('CommonServiceInterface')
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'register-user' })
  async registerUser(
    @Ctx() context: RmqContext,
    @Payload() newUser: NewUserDto,
  ) {
    this.commonService.ackMessage(context);
    return this.authService.registerUser(newUser);
  }

  @MessagePattern({ cmd: 'login-user' })
  async loginUser(
    @Ctx() context: RmqContext,
    @Payload() user: ExistingUserDto,
  ) {
    this.commonService.ackMessage(context);
    return this.authService.loginUser(user);
  }

  @MessagePattern({ cmd: 'google-login' })
  @UseGuards(GoogleOauthGuard)
  async googleLogin(
    @Ctx() context: RmqContext,
    // @Payload() user: ExistingUserDto,
  ) {
    this.commonService.ackMessage(context);
    //return this.authService.getGoogleCallbackUrl(user);
  }

  @MessagePattern({ cmd: 'google-callback' })
  @UseGuards(GoogleOauthGuard)
  async googleCallback(@Ctx() context: RmqContext) {
    this.commonService.ackMessage(context);
    return this.authService.googleCallback();
  }

  @MessagePattern({ cmd: 'get-users' })
  async getUsers(@Ctx() context: RmqContext) {
    this.commonService.ackMessage(context);
    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'verify-jwt' })
  @UseGuards(JwtGuard)
  async verifyJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.commonService.ackMessage(context);
    return this.authService.verifyJwt(payload.jwt);
  }
}
