import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateCoffeeDetailDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsUUID()
  readonly coffeeId: string;
}

