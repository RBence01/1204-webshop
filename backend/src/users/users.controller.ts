import { Controller, Get, Post, Body, Param, ExecutionContext, UseGuards, HttpCode, Request, BadRequestException, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard, Public } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly auth: AuthService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('isLoggedIn')
  isLoggedIn(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Post('login')
  login(@Body('username') username: string, @Body('password') password: string) {
    if (!username || !password) throw new BadRequestException("All fields are required!");
    return this.auth.signIn(username, password);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}
