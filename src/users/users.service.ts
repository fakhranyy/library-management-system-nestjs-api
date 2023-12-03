import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const usernameAlreadyExists = await this.userRepo.findOne({
      where: { username: createUserDto.username },
    });
    if (usernameAlreadyExists) {
      throw new BadRequestException('username already found in database');
    }
    const emailAlreadyExists = await this.userRepo.findOne({
      where: { username: createUserDto.email },
    });

    if (emailAlreadyExists) {
      throw new BadRequestException('Email already found in database!');
    }
    const newUser = new User();
    Object.assign(newUser, createUserDto);
    return this.userRepo.save(newUser);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(username: string ): Promise<User> {
    return await this.userRepo.findOne({
      where: {
        username: username,
      },
    });
  }
}
