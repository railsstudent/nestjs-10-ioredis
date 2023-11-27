import { IsNotEmpty } from 'class-validator';

export class AnimalColorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;
}
