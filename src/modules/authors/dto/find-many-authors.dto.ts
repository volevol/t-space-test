import { IsEnum, IsOptional, IsString, Max, Min } from 'class-validator';

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
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(AuthorsSort)
  sort?: AuthorsSort;
}
