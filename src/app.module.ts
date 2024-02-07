import { Module } from '@nestjs/common';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, AuthorsModule, BooksModule],
})
export class AppModule {}
