/* eslint-disable prettier/prettier */
import { BaseAbstractRepo } from './base/base.abstract.repo';
import { UsersRepoInterface } from '../interfaces/users.repo.interface';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepo
  extends BaseAbstractRepo<UserEntity>
  implements UsersRepoInterface
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepo: Repository<UserEntity>,
  ) {
    super(UserRepo);
  }
}
