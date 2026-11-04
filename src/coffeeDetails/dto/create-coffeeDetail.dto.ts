import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDetailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of a detail',
    examples: ['لته', 'گلد'],
    default: 'گلد',
  })
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsUUID()
  readonly coffeeId: string;
}
