import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // CREATE
  async create(createUserDto: CreateUserDto) {
    const exists = await this.usersRepository.existsBy({
      email: createUserDto.email,
    });
    if (exists) {
      throw new ConflictException();
    }

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  // READ (all)
  findAll() {
    return this.usersRepository.find();
  }

  // READ (one)
  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  // UPDATE
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException();
    }
    return this.usersRepository.save(user);
  }

  // DELETE
  async remove(id: number) {
    const user = await this.findOne(id); // throws 404 if missing
    return this.usersRepository.remove(user);
  }
}
