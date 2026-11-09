import { Injectable } from '@nestjs/common';
import {
  AuthenticationRegistry,
  JwtBearerProvider,
  type JwtClaims,
} from '@nestjs/authentication';
import { UsersService } from '../users/users.service.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class JwtAuth extends JwtBearerProvider<User> {
  constructor(
    private readonly usersService: UsersService,
    registry: AuthenticationRegistry,
  ) {
    super();
    registry.registerProvider(this);
  }

  validate({ sub }: JwtClaims) {
    //here add other checks
    return sub ? this.usersService.findOneById(sub) : null;
  }
}
