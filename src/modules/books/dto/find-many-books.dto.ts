import { IsEnum, IsOptional, IsString, Max, Min } from 'class-validator';

export enum BooksSort {
  NAME = 'name',
  CONTENT = 'content',
}
export class FindManyBooksDto {
  @Min(0)
  skip = 0;

  @Min(1)
  @Max(50)
  take = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(BooksSort)
  sort?: BooksSort;
}
