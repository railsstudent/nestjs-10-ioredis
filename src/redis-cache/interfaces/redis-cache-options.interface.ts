import { Redis } from 'ioredis';

export interface RedisCacheModuleOptions {
  storage: Redis;
}
