import { RedisModule } from '@songkeys/nestjs-redis';
import { env } from './env.config';

export const redisConfig = RedisModule.forRoot({
  closeClient: true,
  config: {
    host: env.REDIS.HOST,
    port: env.REDIS.PORT,
  },
});
