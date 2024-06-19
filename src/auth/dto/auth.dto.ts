import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class authDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'vinihgv@gmail.com',
    required: true,
  })
  email: string;
  
  @ApiProperty({
    example: 'password12',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
