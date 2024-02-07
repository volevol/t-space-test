import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Author } from '@prisma/client';
import { CreateAuthorDto } from './dto/create-author.dto';
import { FindManyAuthorsDto } from './dto/find-many-authors.dto';
import { containsSearch } from '../../common/helpers';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAuthorDto): Promise<Author> {
    const existingAuthor = await this.prisma.author.findFirst({
      where: {
        OR: [
          {
            email: { equals: data.email },
            phoneNumber: { equals: data.phoneNumber },
          },
        ],
      },
    });

    console.log(existingAuthor);

    if (existingAuthor) {
      throw new BadRequestException(
        'An author with this email or phone number already exists.',
      );
    }

    return this.prisma.author.create({
      data,
    });
  }

  async findMany({
    skip,
    take,
    sort,
    filters,
  }: FindManyAuthorsDto): Promise<Author[]> {
    return this.prisma.author.findMany({
      skip,
      take,
      ...(filters && {
        where: {
          OR: filters.map(({ field, value }) => ({
            [field]: containsSearch(value),
          })),
        },
      }),
      ...(sort && {
        orderBy: { [sort]: 'asc' },
      }),
    });
  }

  async findOne(id: number): Promise<Author | null> {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException('No author with such id');
    }

    return author;
  }

  async update(id: number, data: UpdateAuthorDto): Promise<Author> {
    await this.findOne(id);

    return this.prisma.author.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Author> {
    await this.findOne(id);

    return this.prisma.author.delete({
      where: { id },
    });
  }
}
