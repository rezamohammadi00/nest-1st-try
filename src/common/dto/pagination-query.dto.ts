import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;
}
