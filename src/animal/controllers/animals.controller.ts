import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateAnimalDto } from '~animal/dtos/create-animal.dto';
import { DeleteAnimalDto } from '~animal/dtos/delete-animal.dto';
import { AnimalsService } from '~animal/services/animals.service';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalService: AnimalsService) {}

  @Post()
  async save(@Body() dto: CreateAnimalDto): Promise<void> {
    await this.animalService.cacheValue(dto);
  }

  @Get()
  async retrieve(@Query('name') name: string): Promise<CreateAnimalDto | undefined> {
    const color = await this.animalService.getValue(name);
    if (color !== 'No key') {
      return {
        name,
        color,
      };
    }

    return undefined;
  }

  @Delete()
  async kill(@Body() dto: DeleteAnimalDto): Promise<void> {
    await this.animalService.delValue(dto);
  }
}
