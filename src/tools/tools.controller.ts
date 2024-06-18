import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  Optional,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Tool')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createToolDto: CreateToolDto,
  ) {
    try {
      const res = await this.toolsService.create(createToolDto);
      return response.status(201).send(res);
    } catch (e) {
      return response.status(404).send(e);
    }
  }

  @ApiProperty({ required: false })
  @Get()
  async findAll(@Query('tag') tag?: string) {
    return await this.toolsService.findAll(tag);
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const res = await this.toolsService.remove(parseInt(id));
      return response.status(200).send(res);
    } catch (e) {
      return response.status(404).send(e);
    }
  }
}
