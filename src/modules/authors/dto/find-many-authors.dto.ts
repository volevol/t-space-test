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

export enum AuthorsSort {
  NAME = 'name',
  SURNAME = 'surname',
  EMAIL = 'email',
  PHONENUMBER = 'phoneNumber',
}

export class FindManyAuthorsDto {
  @Min(0)
  skip = 0;

  @Min(1)
  @Max(50)
  take = 10;

  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FilterAuthorDto)
  filters?: FilterAuthorDto[];

  @IsOptional()
  @IsEnum(AuthorsSort)
  sort?: AuthorsSort;
}

class FilterAuthorDto {
  @IsEnum(AuthorsSort)
  field: AuthorsSort;

  @IsString()
  value: string;
}
