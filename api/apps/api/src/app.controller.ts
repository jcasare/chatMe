import { AuthGuard } from '@app/common';
import { AuthGuard as GoogleAuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
//import { GoogleOauthGuard } from 'apps/auth/src/guards/google-oauth.guard';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('STATUS_SERVICE') private readonly statusService: ClientProxy,
  ) {}

  @Post('auth')
  async createUser() {
    return this.authService.send({ cmd: 'create-user' }, {});
  }

  @Delete('auth')
  async deleteUsers() {
    return this.authService.send({ cmd: 'delete-users' }, {});
  }

  @UseGuards(AuthGuard)
  @Get('status')
  async getStatus() {
    return this.statusService.send({ cmd: 'get-status' }, {});
  }

  @Post('auth/register')
  async registerUser(@Body() requestBody: any) {
    const { firstName, lastName, email, password } = requestBody;
    return this.authService.send(
      { cmd: 'register-user' },
      {
        firstName,
        lastName,
        email,
        password,
      },
    );
  }

  @Post('auth/login')
  async loginUser(@Body() requestBody: any) {
    const { email, password } = requestBody;
    return this.authService.send(
      { cmd: 'login-user' },
      {
        email,
        password,
      },
    );
  }

  @Get('auth/google')
  async googleLogin() {
    return this.authService.send({ cmd: 'google-login' }, {});
  }

  @Get('auth/google/callback')
  @UseGuards(GoogleAuthGuard('google'))
  async googleLoginRedirect(@Req() req: any) {
    return req.user;
    //return this.authService.send({ cmd: 'google-login-callback' }, {});
  }
}
