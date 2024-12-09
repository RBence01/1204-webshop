import { Body, Controller, Get, HttpCode, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/auth.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly auth: AuthService) { }

    @HttpCode(204)
    @Get('isLoggedIn')
    isLoggedIn() { }

    @Public()
    @Post('login')
    login(@Body('username') username: string, @Body('password') password: string) {
        return this.auth.signIn(username, password);
    }
}
