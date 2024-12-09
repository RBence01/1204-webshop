import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: PrismaService,
    private readonly auth: AuthService
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.auth.signUp(createUserDto);
  }

  findAll() {
    return this.db.user.findMany({select: {username: true}});
  }

  findOne(username: string) {
    return this.db.user.findUnique({where: {username}, select: {username: true}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
