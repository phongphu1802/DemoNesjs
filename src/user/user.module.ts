import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/role.entity';
import { InterestModule } from 'src/interest/interest.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), NestjsFormDataModule, RoleModule, InterestModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
