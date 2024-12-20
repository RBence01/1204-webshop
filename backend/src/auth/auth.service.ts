import { CreateUserDto } from './../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async signIn(username: string, password: string) {
    if (!username || !password) throw new UnauthorizedException();
    const user = await this.db.user.findUnique({ where: { username } })
    if (!user) throw new UnauthorizedException();
    if (user.username != username) throw new UnauthorizedException();
    if (!(await compare(password, user.password))) throw new UnauthorizedException();
    const token = await this.jwtService.signAsync({ sub: user.email, id: user.id });
    return {
      access_token: token
    }
  }

  async signUp(dto: CreateUserDto) {
    try {
      const user = await this.db.user.create({ data: { ...dto, password: await hash(dto.password, 10) } });
      const token = await this.jwtService.signAsync({ sub: user.email, id: user.id });
      return { access_token: token };
    } catch (error) {
      return undefined;
    }
  }
}
