import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, UsersService, JwtService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
