import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@songkeys/nestjs-redis';
import { Redis } from 'ioredis';
import { env } from '../../configs/env.config';
import { CreateAnimalDto } from '../dtos/create-animal.dto';
import { DeleteAnimalDto } from '../dtos/delete-animal.dto';

async function get<T>(redisCache: Redis, key: string) {
  const val = await redisCache.get(key);
  return val === undefined || val === null ? undefined : (JSON.parse(val) as T);
}

function getVal(value: unknown) {
  return JSON.stringify(value) || '"undefined"';
}

@Injectable()
export class AnimalsService {
  constructor(@InjectRedis() private cache: Redis) {}

  async cacheValue({ name, color }: CreateAnimalDto): Promise<void> {
    if (env.REDIS.TTL) {
      await this.cache.set(name, getVal(color), 'EX', env.REDIS.TTL);
    } else {
      await this.cache.set(name, getVal(color));
    }
  }

  async getValue(key: string): Promise<string> {
    const value = await get<string>(this.cache, key);
    return value || 'No key';
  }

  async delValue({ name }: DeleteAnimalDto): Promise<void> {
    await this.cache.del(name);
  }
}
