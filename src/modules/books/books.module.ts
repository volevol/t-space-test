import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [PrismaModule, AuthorsModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
