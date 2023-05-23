/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolesDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  description: string;
}

export class EditRolesDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  description: string;
}
