/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateRolesDto } from './role.dto';
import { TransformInterceptor } from 'src/transform.interceptor';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  //get all Role
  @Get()
  @ApiResponse({ status: 200, description: 'Return a list of roles' })
  @UseInterceptors(TransformInterceptor)
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  //get user by id
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a roles' })
  async findOne(@Param('id') id: number): Promise<Role> {
    const user = await this.roleService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //create role
  @Post()
  @FormDataRequest()
  async create(@Body() Role: CreateRolesDto): Promise<Role> {
    return this.roleService.create(Role);
  }

  //update user
  @Put(':id')
  @FormDataRequest()
  async update(@Param('id') id: number, @Body() role: Role): Promise<Role> {
    return this.roleService.update(id, role);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.roleService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.roleService.delete(id);
  }
}
