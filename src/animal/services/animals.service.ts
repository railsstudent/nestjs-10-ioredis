import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { env } from '../../configs/env.config';
import { REDIS_TOKEN } from '../../redis-cache';
import { AnimalColorDto } from '../dtos/animal-color.dto';

@Injectable()
export class AnimalsService {
  constructor(@Inject(REDIS_TOKEN) private redis: Redis) {}

  async cacheValue({ name, color }: AnimalColorDto): Promise<void> {
    if (env.REDIS.TTL) {
      await this.redis.set(name, color, 'EX', env.REDIS.TTL);
    } else {
      await this.redis.set(name, color);
    }
  }

  async getValue(key: string): Promise<string> {
    const value = await this.redis.get(key);
    return value || 'No key';
  }
}
