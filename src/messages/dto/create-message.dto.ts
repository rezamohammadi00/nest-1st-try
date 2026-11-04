import { IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MinLength(3)
  readonly msg: string;
}
