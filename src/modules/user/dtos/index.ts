import { Role } from '@prisma/client';

export interface IUserStore {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
}
