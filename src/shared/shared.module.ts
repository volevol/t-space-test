import { Module } from '@nestjs/common';

// import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [PrismaModule],
})
export class SharedModule {}
