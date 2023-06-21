import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from 'src/users/dto/users-dtos';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInUserDto) {
        return this.authService.signIn(signInDto.userEmail, signInDto.userPassword);
    }


    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
