import { Prisma } from '@prisma/client';

export const containsSearch = (search: string): Prisma.StringFilter => ({
  contains: search.trim(),
  mode: 'insensitive',
});
