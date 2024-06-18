import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response, response } from 'express';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      return response
        .status(201)
        .send(await this.usersService.create(createUserDto));
    } catch (e) {
      return response.status(404).send(e);
    }
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      return response.status(201).send(await this.usersService.findOneById(id));
    } catch (e) {
      return response.status(404).send(e);
    }
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return response
        .status(201)
        .send(await this.usersService.update(id, updateUserDto));
    } catch (e) {
      return response.status(404).send(e);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return response.status(201).send(await this.usersService.remove(id));
    } catch (e) {
      return response.status(404).send(e);
    }
  }
}
