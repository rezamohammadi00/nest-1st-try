import { IsString, MinLength } from 'class-validator';

export class UpdateCoffeeDto {
  @IsString()
  @MinLength(3)
  readonly name: string;
}

// the patch way
// import { PartialType } from '@nestjs/swagger';
// import { CreateCoffeeDto } from './create-coffee.dto.js';
// export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
