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
  Put,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto.js';
import { UpdateMessageDto } from './dto/update-message.dto.js';
import { CreateMessageDto } from './dto/create-message.dto.js';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}
  @Get()
  list(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.messagesService.getAll(paginationQueryDto);
  }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return id;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return null;
  }

  @Put('id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return id;
  }
}
