import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { authDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(requestDTO: authDto) {
    const { email, password } = requestDTO;
    const user = await this.usersService.findByEmail(requestDTO.email);

    const validPassword = await compare(password, user.password);

    if (!user || !validPassword)
      throw new UnauthorizedException('Usuário ou Senha Inválidos');

    const payload = { sub: user.id, username: user.name };

    return await this.generateToken(payload);
  }

  async generateToken(payload: any) {
    return {
      access_token: await this.jwtService.signAsync(
        {
          payload,
        },
        {
          secret: process.env.SECRET,
          expiresIn: '7d',
        },
      ),
    };
  }
}
