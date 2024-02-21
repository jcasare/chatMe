import { BaseInterfaceRepo } from '@app/common';
import { UserEntity } from '../entities/user.entity';

export interface UsersRepoInterface extends BaseInterfaceRepo<UserEntity> {}
