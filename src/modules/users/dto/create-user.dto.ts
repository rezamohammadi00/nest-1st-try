import { IsEmail, IsStrongPassword } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform(({ value }) =>
    // before validation
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
