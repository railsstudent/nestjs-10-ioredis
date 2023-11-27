import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AnimalsService } from '../services/animals.service';
import { AnimalColorDto } from '../dtos/animal-color.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalService: AnimalsService) {}

  @Post()
  async save(@Body() dto: AnimalColorDto): Promise<void> {
    await this.animalService.cacheValue(dto);
  }

  @Get()
  async retrieve(@Query('name') name: string): Promise<AnimalColorDto | undefined> {
    const color = await this.animalService.getValue(name);
    if (color !== 'No key') {
      return {
        name,
        color,
      };
    }

    return undefined;
  }
}
