import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  @ApiProperty({
    default: 'Passw0rd!',
    description:
      'Password must be at least 8 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  })
  readonly password: string;
}
