import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  readonly email: string;

  @IsString()
  @MinLength(3)
  readonly password: string;
}
