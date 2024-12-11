import { BadRequestException, Body, Controller, Get, HttpCode, Post, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly auth: AuthService) { }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Get('isLoggedIn')
    isLoggedIn() { }

    @Post('login')
    login(@Body('username') username: string, @Body('password') password: string) {
        if (!username || !password) throw new BadRequestException("All fields are required!");
        return this.auth.signIn(username, password);
    }
}
