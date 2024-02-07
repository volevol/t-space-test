import { IsOptional, IsString, Max, Min } from 'class-validator';

export class FindManyAuthorsDto {
  @Min(0)
  skip = 0;

  @Min(1)
  @Max(50)
  take = 10;

  @IsOptional()
  @IsString()
  search?: string;
}
