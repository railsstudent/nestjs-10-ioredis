import { Module } from '@nestjs/common';
import { AnimalModule } from './animal/animal.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { globalCacheConfig } from './configs/cache.config';
import { redisConfig } from './configs/redis.config';

@Module({
  imports: [globalCacheConfig, redisConfig, AnimalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
