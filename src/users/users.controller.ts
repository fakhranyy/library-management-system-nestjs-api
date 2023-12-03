import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userServ: UsersService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userServ.createUser(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userServ.findAllUsers();
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.userServ.findOne(username);
  } 
}
