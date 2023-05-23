import { Body, Controller, Post } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly rolesService: UserService) {}
  //create role
  @Post()
  @FormDataRequest()
  async create(@Body() roles: CreateUserDto): Promise<User> {
    return this.rolesService.create(roles);
  }
}
