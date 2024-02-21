import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule, CommonService, DbModule, UsersRepo } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt-strategy';
import { GoogleStrategy } from './strategies/google-strategy';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    PassportModule,
    CommonModule,
    DbModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'AuthServiceInterface', useClass: AuthService },
    { provide: 'UsersRepoInterface', useClass: UsersRepo },
    { provide: 'CommonServiceInterface', useClass: CommonService },
    JwtGuard,
    GoogleOauthGuard,
    JwtStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
