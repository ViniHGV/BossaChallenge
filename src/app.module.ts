import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ToolsModule } from './tools/tools.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PrismaModule, ToolsModule, AuthModule],
})
export class AppModule {}
