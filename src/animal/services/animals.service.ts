import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@songkeys/nestjs-redis';
import { Redis } from 'ioredis';
import { env } from '~configs/env.config';
import { deleteCacheValue, getCacheValue, setCacheValue } from '~core/helpers/cache-value.helper';
import { CreateAnimalDto } from '../dtos/create-animal.dto';
import { DeleteAnimalDto } from '../dtos/delete-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(@InjectRedis() private cache: Redis) {}

  async cacheValue({ name, color }: CreateAnimalDto): Promise<void> {
    await setCacheValue(this.cache, name, color, env.REDIS.TTL);
  }

  async getValue(key: string): Promise<string> {
    const value = await getCacheValue<string>(this.cache, key);
    return value || 'No key';
  }

  async delValue({ name }: DeleteAnimalDto): Promise<void> {
    await deleteCacheValue(this.cache, name);
  }
}
