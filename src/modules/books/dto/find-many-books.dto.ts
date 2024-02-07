import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEnum,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

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
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FilterBookDto)
  filters?: FilterBookDto[];

  @IsOptional()
  @IsEnum(BooksSort)
  sort?: BooksSort;
}

class FilterBookDto {
  @IsEnum(BooksSort)
  field: BooksSort;

  @IsString()
  value: string;
}
