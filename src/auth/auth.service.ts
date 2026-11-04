import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  login(loginDto: LoginDto) {
    return loginDto;
  }
}
