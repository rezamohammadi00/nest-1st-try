// Tip:
// nest g mo messages
// nest g mo messages  -d ---> Report the changes that would be made, without changing the filesystem.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoffeesController } from './coffees.controller.js';
import { CoffeesService } from './coffees.service.js';
import { Coffee } from './coffee.entity.js';


@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  // exports:[CoffeesService]
})
export class CoffeesModule { }
