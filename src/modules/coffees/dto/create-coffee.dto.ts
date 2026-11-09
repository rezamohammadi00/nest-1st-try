import { IsString, MinLength } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @MinLength(3)
  readonly name: string;
}
