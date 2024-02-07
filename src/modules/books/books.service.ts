import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '@prisma/client';
import { FindManyBooksDto } from './dto/find-many-books.dto';
import { containsSearch } from '../../common/helpers';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authorsService: AuthorsService,
  ) {}

  async create({ authorId: id, ...data }: CreateBookDto): Promise<Book> {
    await this.authorsService.findOne(id);

    return this.prisma.book.create({
      data: {
        ...data,
        author: {
          connect: { id },
        },
      },
    });
  }

  async findMany({
    skip,
    take,
    sort,
    filters,
  }: FindManyBooksDto): Promise<Book[]> {
    return this.prisma.book.findMany({
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

  async findOne(id: number): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('No book with such id');
    }

    return book;
  }

  async update(id: number, data: UpdateBookDto): Promise<Book> {
    await this.findOne(id);

    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Book> {
    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
    });
  }
}
