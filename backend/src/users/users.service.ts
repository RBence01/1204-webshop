import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: PrismaService,
    private readonly auth: AuthService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const response = await this.auth.signUp(createUserDto);
    if (response) return response;
    else throw new BadRequestException();
  }

  findAll() {
    return this.db.user.findMany({select: {username: true}});
  }

  findOne(id: number) {
    return this.db.user.findUnique({where: {id}, select: {username: true, email: true, promotionalEmails: true, id: true}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) updateUserDto.password = await hash(updateUserDto.password, 10);
    return await this.db.user.update({where: {id}, data: updateUserDto});
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
