import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@nestjs/authentication';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtAuth } from './jwt-auth.provider.js';
import { UsersModule } from '../users/users.module.js';
import { Env } from '../../config/env.schema.js';

//! cookie-session : need to read the doc
@Module({
  imports: [
    UsersModule,
    AuthenticationModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => ({
        accessToken: {
          key: config.get('JWT_SECRET', { infer: true }),
          ttl: config.get('JWT_TTL', { infer: true }),
        },
        refreshToken: false,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuth],
})
export class AuthModule {}
