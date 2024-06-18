import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'ViniHGV',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'vinihgv@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password12',
    required: true,
  })
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
