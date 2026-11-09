// Tip:
// nest g s coffees
// nest g s coffees -d ---> Report the changes that would be made, without changing the filesystem.
// also registers the service in the providers array of the nearest module.

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCoffeeDto } from './dto/create-coffee.dto.js';
import { UpdateCoffeeDto } from './dto/update-coffee.dto.js';
import { Coffee } from './coffee.entity.js';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) { }

  findAll(paginationQueryDto: PaginationQueryDto): Promise<Coffee[]> {
    const { limit = 10, page = 1 } = paginationQueryDto;
    return this.coffeesRepository.find(
      {
        relations: {
          coffee_detail: true
        },
        skip: (page - 1) * limit,
        take: limit,
      }
    );
  }

  async findOne(id: string): Promise<Coffee> {
    const coffee = await this.coffeesRepository.findOneBy({ id });

    if (!coffee) {
      throw new NotFoundException();
    }

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const coffee = this.coffeesRepository.create(createCoffeeDto);
    return this.coffeesRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    // preload merges the DTO onto the existing row, returns undefined if the id doesn't exist
    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeDto,
    });

    if (!coffee) {
      throw new NotFoundException();
    }

    return this.coffeesRepository.save(coffee);
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.coffeesRepository.delete(id) // =~ touched 
    if (!affected) {
      throw new NotFoundException();
    }
  }
}
