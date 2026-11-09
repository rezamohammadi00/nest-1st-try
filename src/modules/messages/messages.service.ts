import { Injectable } from '@nestjs/common';
import { Message } from './message.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import { CreateMessageDto } from './dto/create-message.dto.js';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  getAll(paginationQueryDto: PaginationQueryDto): Promise<Message[]> {
    const { limit = 10, page = 1 } = paginationQueryDto;
    return this.messagesRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  create(createMessageDto: CreateMessageDto): Promise<InsertResult> {
    return this.messagesRepository.insert(createMessageDto);
  }
}
