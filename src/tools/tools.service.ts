import { Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToolsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createToolDto: CreateToolDto) {
    return await this.prismaService.tool.create({ data: createToolDto });
  }

  async findAll(tag?: string) {
    const tools = await this.prismaService.tool.findMany();

    if (tag) {
      const toolsWithFilterTag = tools.filter((tool) =>
        tool.tags.includes(tag),
      );

      return toolsWithFilterTag;
    }

    return tools;
  }

  async findById(id: number) {
    const toolById = await this.prismaService.tool.findUnique({
      where: { id },
    });

    if (!toolById) throw new Error('Ferramenta informada não existe!');

    return toolById;
  }

  async remove(id: number) {
    await this.findById(id);

    return await this.prismaService.tool.delete({ where: { id } });
  }
}
