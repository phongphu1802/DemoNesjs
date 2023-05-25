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
import { ResponseMessage } from 'src/response.decorator';
import { ROLE_DELETED, ROLE_INSERTED, ROLE_SELECTED, ROLE_UPDATED } from 'src/response.constants';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  //get all Role
  @Get()
  @ApiResponse({ status: 200, description: 'Return a list of roles' })
  @UseInterceptors(TransformInterceptor)
  @ResponseMessage(ROLE_SELECTED)
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  //get user by id
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a roles' })
  @ResponseMessage(ROLE_SELECTED)
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
  @UseInterceptors(TransformInterceptor)
  @ResponseMessage(ROLE_INSERTED)
  async create(@Body() Role: CreateRolesDto): Promise<Role> {
    return this.roleService.create(Role);
  }

  //update user
  @Put(':id')
  @FormDataRequest()
  @UseInterceptors(TransformInterceptor)
  @ResponseMessage(ROLE_UPDATED)
  async update(@Param('id') id: number, @Body() role: Role): Promise<Role> {
    return this.roleService.update(id, role);
  }

  //delete user
  @Delete(':id')
  @UseInterceptors(TransformInterceptor)
  @ResponseMessage(ROLE_DELETED)
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.roleService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.roleService.delete(id);
  }
}
