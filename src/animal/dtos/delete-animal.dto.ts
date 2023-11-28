import { IsNotEmpty } from 'class-validator';

export class DeleteAnimalDto {
  @IsNotEmpty()
  name: string;
}
