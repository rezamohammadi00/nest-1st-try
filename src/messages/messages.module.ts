// Tip:
// nest g mo messages
// nest g mo messages  -d ---> Report the changes that would be made, without changing the filesystem.

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesController } from './messages.controller.js';
import { MessagesService } from './messages.service.js';
import { Message } from './message.entity.js';
// import { CoffeesModule } from '../coffees/coffees.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  // imports:[CoffeesModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
