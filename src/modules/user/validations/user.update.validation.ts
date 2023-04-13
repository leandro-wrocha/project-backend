import { IUserUpdate } from '../dtos';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UserUpdateValidation implements IUserUpdate {
  @IsOptional()
  @MinLength(8)
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
