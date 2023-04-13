import { Role } from '@prisma/client';
import { IUserStore } from '../dtos';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UserStoreValidation implements IUserStore {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
