import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '@prisma/client';
import { FindManyBooksDto } from './dto/find-many-books.dto';
import { containsSearch } from '../../common/helpers';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  create({ authorId: id, ...data }: CreateBookDto): Promise<Book> {
    return this.prisma.book.create({
      data: {
        ...data,
        author: {
          connect: { id },
        },
      },
    });
  }

  findMany({ skip, take, search }: FindManyBooksDto): Promise<Book[]> {
    return this.prisma.book.findMany({
      skip,
      take,
      ...(search && {
        where: {
          OR: [
            { name: containsSearch(search) },
            { content: containsSearch(search) },
          ],
        },
      }),
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateBookDto): Promise<Book> {
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<Book> {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
