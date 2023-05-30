import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  NotFoundException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { TransformInterceptor } from 'src/transform.interceptor';
import { ResponseMessage } from 'src/response.decorator';
import { USER_DELETED, USER_INSERTED, USER_SELECTED, USER_UPDATED } from 'src/response.constants';
import { RoleService } from 'src/role/role.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly roleService: RoleService) {}

  //get all users
  @Get()
  @UseInterceptors(TransformInterceptor)
  @ResponseMessage(USER_SELECTED)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  //get user by id
  @Get(':id')
  @UseInterceptors(TransformInterceptor)
  @ResponseMessage(USER_SELECTED)
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //create user
  @Post()
  @FormDataRequest()
  @UseInterceptors(TransformInterceptor)
  @ResponseMessage(USER_INSERTED)
  async create(@Body() User: CreateUserDto): Promise<User> {
    return this.userService.create(User);
  }

  //update user
  @Put(':id')
  @UseInterceptors(TransformInterceptor)
  @ResponseMessage(USER_UPDATED)
  async update(@Param('id') id: number, @Body() user: UpdateUserDto): Promise<User> {
    return this.userService.update(id, user);
  }

  //delete user
  @Delete(':id')
  @UseInterceptors(TransformInterceptor)
  @ResponseMessage(USER_DELETED)
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.userService.delete(id);
  }
}
