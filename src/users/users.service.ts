import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    let { email, password } = createUserDto;
    const userByEmail = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (userByEmail) throw new Error('Já existe um usuário com esse E-mail!');

    return await this.prismaService.user.create({
      data: { ...createUserDto, password: await hash(password, 10) },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOneById(id: string) {
    const userById = this.prismaService.user.findUnique({ where: { id } });

    if (!userById) throw new Error('Usuário inserido não existe!');

    return userById;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOneById(id);

    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    await this.findOneById(id);

    return await this.prismaService.user.delete({ where: { id } });
  }
}
