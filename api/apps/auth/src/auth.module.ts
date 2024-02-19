/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule, CommonService, DbModule, UsersRepo } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt-strategy';

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
    JwtStrategy,
  ],
})
export class AuthModule {}
