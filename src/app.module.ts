import { Module } from '@nestjs/common';
import { AnimalModule } from './animal/animal.module';
import { AppController } from './app.controller';
import { redisConfig } from './configs/redis.config';

@Module({
  imports: [redisConfig, AnimalModule],
  controllers: [AppController],
})
export class AppModule {}
