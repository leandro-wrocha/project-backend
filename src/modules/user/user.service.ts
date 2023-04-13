import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IUserStore, IUserUpdate } from './dtos';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private async findById(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.user.findMany();

      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    const userExists = await this.findById(id);

    if (!userExists) {
      throw new NotFoundException();
    }

    return userExists;
  }

  async store(data: IUserStore) {
    data.password = await hash(data.password, Number(process.env.SALT_ROUNDS));

    try {
      await this.prismaService.user.create({
        data: {
          ...data,
          role_id: 'd860f629-249a-41ae-b431-7c068969fc8c',
        },
      });
    } catch (error: any) {
      if (error.meta.target[0].includes('email')) {
        throw new HttpException(
          {
            error: HttpStatus.BAD_REQUEST,
            message: 'email already exists.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new InternalServerErrorException();
    }
  }

  async update(id: string, data: IUserUpdate) {
    const userExists = await this.findById(id);

    if (!userExists) {
      throw new NotFoundException();
    }

    try {
      await this.prismaService.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (error: any) {
      if (error.meta.target[0].includes('email')) {
        throw new HttpException(
          {
            error: HttpStatus.BAD_REQUEST,
            message: 'email already exists.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new InternalServerErrorException();
    }
  }

  async destroy(id: string) {
    const userExists = await this.findById(id);

    if (!userExists) {
      throw new InternalServerErrorException();
    }

    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
