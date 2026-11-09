import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateCoffeeDetailDto } from './dto/create-coffeeDetail.dto.js';
import { UpdateCoffeeDetailDto } from './dto/update-coffeeDetail.dto.js';
import { CoffeeDetailsService } from './coffeeDetails.service.js';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';

@Controller('coffeeDetails')
@ApiTags('Coffee Details')
export class CoffeeDetailsController {
  constructor(private coffeeDetailsService: CoffeeDetailsService) {}

  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.coffeeDetailsService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.coffeeDetailsService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDetailDto: CreateCoffeeDetailDto) {
    return this.coffeeDetailsService.create(createCoffeeDetailDto);
  }

  @Post(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCoffeeDetailDto: UpdateCoffeeDetailDto,
  ) {
    return this.coffeeDetailsService.update(id, updateCoffeeDetailDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.coffeeDetailsService.remove(id);
  }
}
