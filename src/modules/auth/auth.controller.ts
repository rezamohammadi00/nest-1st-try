import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { CurrentUser, Public } from '@nestjs/authentication';
import { User } from '../users/entities/user.entity.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    const tokens = await this.authService.login(registerDto);
    return {
      user,
      tokens,
    };
  }

  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.authService.login(loginDto);
    const { password: _, ...user } = loginDto;

    return {
      user,
      tokens,
    };
  }

  @Get('me')
  me(@CurrentUser() user: User) {
    return user;
  }
}
