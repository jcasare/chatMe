/* eslint-disable prettier/prettier */
import { UserEntity } from '@app/common';
import { ExistingUserDto } from '../dtos/existing-user.dto';
import { NewUserDto } from '../dtos/new-user.dto';
export interface AuthServiceInterface {
  hashPassword(password: string): Promise<string>;
  getUserByEmail(email: string): Promise<UserEntity>;
  comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
  validateUser(email: string, password: string): Promise<UserEntity>;
  registerUser(newUser: Readonly<NewUserDto>): Promise<UserEntity>;
  loginUser(
    existingUser: Readonly<ExistingUserDto>,
  ): Promise<{ token: string }>;
  getUsers(): Promise<UserEntity[]>;
  getUserById(id: number): Promise<UserEntity>;
  // deleteUsers(): Promise<UserEntity>;
  verifyJwt(jwt: string): Promise<{ exp: number }>;
}
