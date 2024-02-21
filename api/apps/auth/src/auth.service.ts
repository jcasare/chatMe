import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { NewUserDto } from './dtos/new-user.dto';
import { ExistingUserDto } from './dtos/existing-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthServiceInterface } from './interface/auth.service.interface';
import { UsersRepoInterface } from '@app/common';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject('UsersRepoInterface')
    private readonly userRepo: UsersRepoInterface,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findByOptions({
      where: { email },
      select: ['id', 'firstName', 'lastName', 'email', 'password'],
    });
  }

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepo.findOneById(id);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.getUserByEmail(email);
    const userExists = !!user;
    if (!userExists) {
      return null;
    }
    const passwordMatch = await this.comparePasswords(password, user.password);
    if (!passwordMatch) {
      return null;
    }
    return user;
  }

  async registerUser(newUser: Readonly<NewUserDto>): Promise<UserEntity> {
    const { firstName, lastName, email, password } = newUser;
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists!');
    }
    const hashedPassword = await this.hashPassword(password);
    const registeredUser = await this.userRepo.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    delete registeredUser.password;
    return registeredUser;
  }

  async loginUser(
    existingUser: Readonly<ExistingUserDto>,
  ): Promise<{ token: string }> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }

  async getUsers() {
    return this.userRepo.findAll();
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  async googleCallback() {}
}
