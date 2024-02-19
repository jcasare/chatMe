/* eslint-disable prettier/prettier */
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseInterfaceRepo } from './base.interface.repo';

interface hasId {
  id: number;
}
export abstract class BaseAbstractRepo<T extends hasId>
  implements BaseInterfaceRepo<T>
{
  protected constructor(private entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.entity.save(data);
  }

  public create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }

  public createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data);
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = { id };
    return await this.entity.findOneBy(options);
  }

  public async findByOptions(options: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOne(options);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async delete(data: T): Promise<T> {
    return await this.entity.remove(data);
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.entity.preload(entityLike);
  }
}
