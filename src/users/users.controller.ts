import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpException,
  HttpStatus,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { authDto } from 'src/auth/dto/auth.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('auth')
  async auth(@Res() res: Response, @Body() authRequest: authDto) {
    try {
      return res.status(200).send(await this.authService.signIn(authRequest));
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      return res
        .status(201)
        .send(await this.usersService.create(createUserDto));
    } catch (e) {
      return res.status(404).send(e);
    }
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      return res.status(201).send(await this.usersService.findOneById(id));
    } catch (e) {
      return res.status(404).send(e);
    }
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return res
        .status(201)
        .send(await this.usersService.update(id, updateUserDto));
    } catch (e) {
      return res.status(404).send(e);
    }
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      return res.status(201).send(await this.usersService.remove(id));
    } catch (e) {
      return res.status(404).send(e);
    }
  }
}
