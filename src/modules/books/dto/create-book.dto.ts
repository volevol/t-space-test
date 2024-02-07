import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  content?: string;
}
