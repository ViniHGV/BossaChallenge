import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateToolDto {
  @ApiProperty({
    example: 'title Example',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'https://github.com/ViniHGV',
    required: true,
  })
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    example: 'description example',
    required: true,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '[node, java, c#]',
    required: true,
  })
  @IsNotEmpty()
  tags: string[];
}
