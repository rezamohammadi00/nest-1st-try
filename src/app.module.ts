// 1 class -> 1 file

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessagesModule } from './modules/messages/messages.module.js';
import { CoffeesModule } from './modules/coffees/coffees.module.js';
import { CoffeeDetailsModule } from './modules/coffeeDetails/coffeeDetails.module.js';
import { Env, envSchema } from './config/env.schema.js';
import { UsersModule } from './modules/users/users.module.js';
import { AuthModule } from './modules/auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV_FILE || '.env',
      isGlobal: true,
      validationSchema: envSchema,
    }),
    // TypeOrmModule.forRoot({
    //   //mysql
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3307,
    //   username: 'root',
    //   password: 'rootpassword',
    //   database: 'mydb',
    //   //postgres
    //   // type: 'postgres',
    //   // port: 5432,
    //   // username: 'postgres',
    //   // password: 'secretpassword',
    //   // database: 'coffee_db',

    //   autoLoadEntities: true,
    //   synchronize: true, // Don't use synchronize: true in production;

    //   // logging: ['query'],
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => ({
        type: 'mysql',
        host: config.get('DB_HOST', { infer: true }),
        port: config.get('DB_PORT', { infer: true }),
        username: config.get('DB_USERNAME', { infer: true }),
        password: config.get('DB_PASSWORD', { infer: true }),
        database: config.get('DB_NAME', { infer: true }),
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV', { infer: true }) !== 'production',
        logging: false,
      }),
    }),
    MessagesModule,
    CoffeesModule,
    CoffeeDetailsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
