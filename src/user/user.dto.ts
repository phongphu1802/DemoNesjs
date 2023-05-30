import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { genderUser } from 'src/app/enum/common';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsArray() // Nếu có dữ liệu phải là dạng array
  @ArrayMinSize(1)
  role: number[];
  @IsNotEmpty()
  gender: genderUser;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsArray() // Nếu có dữ liệu phải là dạng array
  interest: number[];
}

export class UpdateUserDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @IsArray() // Nếu có dữ liệu phải là dạng array
  role: number[];
  gender: genderUser;
  @IsString()
  password: string;
  @IsArray() // Nếu có dữ liệu phải là dạng array
  interest: number[];
}
