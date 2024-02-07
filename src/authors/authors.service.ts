import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Author, Prisma } from '@prisma/client';
import { CreateAuthorDto } from './dto/create-author.dto';
import { FindManyAuthorsDto } from './dto/find-many-authors.dto';
import { containsSearch } from 'src/common/helpers';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAuthorDto): Promise<Author> {
    return this.prisma.author.create({
      data,
    });
  }

  async findMany({
    skip,
    take,
    search,
  }: FindManyAuthorsDto): Promise<Author[]> {
    return this.prisma.author.findMany({
      skip,
      take,
      ...(search && {
        where: {
          OR: [
            { name: containsSearch(search) },
            { surname: containsSearch(search) },
            { email: containsSearch(search) },
          ],
        },
      }),
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number): Promise<Author | null> {
    return this.prisma.author.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAuthorDto): Promise<Author> {
    return this.prisma.author.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Author> {
    return this.prisma.author.delete({
      where: { id },
    });
  }
}
