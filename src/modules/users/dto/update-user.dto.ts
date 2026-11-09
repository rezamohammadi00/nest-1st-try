import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @Transform(({ value }) =>
    // before validation
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  readonly email: string;
}

// for patch:
// import { PartialType } from '@nestjs/swagger';
// import { CreateUserDto } from './create-user.dto.js';
// export class UpdateUserDto extends PartialType(CreateUserDto) {}
