import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoffeeDetailsController } from './coffeeDetails.controller.js';
import { CoffeeDetailsService } from './coffeeDetails.service.js';
import { CoffeeDetail } from './coffeeDetail.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeDetail])],
  controllers: [CoffeeDetailsController],
  providers: [CoffeeDetailsService],
})
export class CoffeeDetailsModule { }
