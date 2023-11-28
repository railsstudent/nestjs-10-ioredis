import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@songkeys/nestjs-redis';
import { Redis } from 'ioredis';
import { env } from '~configs/env.config';
import { getCacheValue, stringifyCacheValue } from '~core/helpers/cache-value.helper';
import { CreateAnimalDto } from '../dtos/create-animal.dto';
import { DeleteAnimalDto } from '../dtos/delete-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(@InjectRedis() private cache: Redis) {}

  async cacheValue({ name, color }: CreateAnimalDto): Promise<void> {
    if (env.REDIS.TTL) {
      await this.cache.set(name, stringifyCacheValue(color), 'EX', env.REDIS.TTL);
    } else {
      await this.cache.set(name, stringifyCacheValue(color));
    }
  }

  async getValue(key: string): Promise<string> {
    const value = await getCacheValue<string>(this.cache, key);
    return value || 'No key';
  }

  async delValue({ name }: DeleteAnimalDto): Promise<void> {
    await this.cache.del(name);
  }
}
