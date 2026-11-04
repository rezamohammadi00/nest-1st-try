// Tip:
// nest g co coffees
// nest g co coffees -d ---> Report the changes that would be made, without changing the filesystem.

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
import { ApiConflictResponse, ApiOperation } from '@nestjs/swagger';

import { CreateCoffeeDto } from './dto/create-coffee.dto.js';
import { UpdateCoffeeDto } from './dto/update-coffee.dto.js';
import { CoffeesService } from './coffees.service.js';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto.js';

@Controller('coffees')
export class CoffeesController {
  constructor(private coffeesService: CoffeesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all coffees',
    description: 'the endpoint not need to be login.',
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  // @ApiResponse()
  @ApiConflictResponse({
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            code: { type: 'string' },
            msg: { type: 'string' },
          },
          required: ['code', 'msg'],
        },
        examples: {
          ERRPR_22: {
            value: { code: 'ERRPR_22', msg: 'this is error' },
          },
          ERRPR_23: {
            value: { code: 'ERRPR_23', msg: 'brand is inactive' },
          },
        },
      },
    },
  })
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Post(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.coffeesService.remove(id);
  }
}
