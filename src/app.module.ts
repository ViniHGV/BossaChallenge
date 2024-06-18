import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ToolsModule } from './tools/tools.module';

@Module({
  imports: [UsersModule, PrismaModule, ToolsModule],
})
export class AppModule {}
