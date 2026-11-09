import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

import { CreateCoffeeDetailDto } from './dto/create-coffeeDetail.dto.js';
import { UpdateCoffeeDetailDto } from './dto/update-coffeeDetail.dto.js';
import { CoffeeDetail } from './coffeeDetail.entity.js';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';

@Injectable()
export class CoffeeDetailsService {
  constructor(
    @InjectRepository(CoffeeDetail)
    private readonly coffeeDetailsRepository: Repository<CoffeeDetail>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto): Promise<CoffeeDetail[]> {
    const { limit = 10, page = 1 } = paginationQueryDto;
    return this.coffeeDetailsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string): Promise<CoffeeDetail> {
    const detail = await this.coffeeDetailsRepository.findOneBy({ id });

    if (!detail) {
      throw new NotFoundException();
    }

    return detail;
  }

  async create(dto: CreateCoffeeDetailDto): Promise<CoffeeDetail> {
    const detail = this.coffeeDetailsRepository.create({
      title: dto.title,
      description: dto.description,
      coffee: { id: dto.coffeeId },
    });

    try {
      return await this.coffeeDetailsRepository.save(detail);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const code = (error.driverError as { code?: string }).code;

        if (code === 'ER_DUP_ENTRY') {
          throw new ConflictException('This coffee already has a detail');
        }
        if (code === 'ER_NO_REFERENCED_ROW_2') {
          throw new NotFoundException('Coffee not found');
        }
      }
      throw error;
    }
  }

  async update(
    id: string,
    updateCoffeeDto: UpdateCoffeeDetailDto,
  ): Promise<CoffeeDetail> {
    const detail = await this.coffeeDetailsRepository.preload({
      id,
      title: updateCoffeeDto.title,
      description: updateCoffeeDto?.description,
      coffee: {
        id: updateCoffeeDto.coffeeId,
      },
    });

    if (!detail) {
      throw new NotFoundException();
    }

    return this.coffeeDetailsRepository.save(detail);
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.coffeeDetailsRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
  }
}
