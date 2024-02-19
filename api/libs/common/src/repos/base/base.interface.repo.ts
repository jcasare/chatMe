/* eslint-disable prettier/prettier */
import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';

export interface BaseInterfaceRepo<T> {
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T>[]): T[];
  save(data: DeepPartial<T>): Promise<T>;
  saveMany(data: DeepPartial<T>[]): Promise<T[]>;
  findOneById(id: number): Promise<T>;
  findByOptions(options: FindOneOptions<T>): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;
  delete(data: T): Promise<T>;
  preload(entityLike: DeepPartial<T>): Promise<T>;
}
