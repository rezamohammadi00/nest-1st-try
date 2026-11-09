import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordHasher, TokenService } from '@nestjs/authentication';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { UsersService } from '../users/users.service.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
  ) {}
  async register(registerDto: RegisterDto): Promise<User> {
    const user = await this.usersService.create({
      ...registerDto,
      password: await this.passwordHasher.hash(registerDto.password),
    });

    return user;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneByEmailWithPassword(
      loginDto.email,
    );

    const valid = await this.passwordHasher.verify(
      loginDto.password,
      user?.password,
    );

    if (!valid || !user) throw new UnauthorizedException('Invalid credentials');

    const { accessToken } = await this.tokenService.issue(user.id, {
      method: 'password',
    });

    return {
      accessToken,
    };
  }
}
