import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_TOKEN } from '../constants/redis.constant';
import { RedisCacheModuleOptions } from '../interfaces/redis-cache-options.interface';
import { MODULE_OPTIONS_TOKEN } from '../interfaces/redis-cache.module-definition';

export const RedisProvider: Provider<Redis> = {
  provide: REDIS_TOKEN,
  useFactory: (options: RedisCacheModuleOptions) => options.storage,
  inject: [MODULE_OPTIONS_TOKEN],
};
