import { Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { async } from 'rxjs';

@Injectable()
export class ToolsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createToolDto: CreateToolDto) {
    return await this.prismaService.tool.create({ data: createToolDto });
  }

  async findAll(tag?: string) {
    const allTools = await this.prismaService.tool.findMany();

    if (tag)
      return await this.prismaService.tool.findMany({
        where: { tags: { has: tag } },
      });

    return allTools;
  }

  async findById(id: number) {
    return await this.prismaService.tool.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    const toolById = await this.findById(id);

    if (!toolById) throw new Error('A ferramenta informada não existe!');

    return await this.prismaService.tool.delete({ where: { id } });
  }
}
