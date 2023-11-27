import { RedisService } from '@songkeys/nestjs-redis';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';

export const globalCacheConfig = RedisCacheModule.registerAsync({
  inject: [RedisService],
  useFactory: (redisService: RedisService) => ({
    storage: redisService.getClient(),
  }),
  isGlobal: true,
});
