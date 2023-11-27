import { Module } from '@nestjs/common';
import { AnimalsController } from './controllers/animals.controller';
import { AnimalsService } from './services/animals.service';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalModule {}
