import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './interfaces/redis-cache.module-definition';
import { RedisProvider } from './providers/redis.provider';

@Module({
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisCacheModule extends ConfigurableModuleClass {}
