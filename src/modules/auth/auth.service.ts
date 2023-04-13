import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuth } from './dtos';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async auth({ email, password }: IAuth) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new NotFoundException();
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new NotFoundException();
    }

    const payload = {
      user_id: userExists.id,
      name: userExists.name,
      email: userExists.email,
    };

    return {
      acesse_token: await this.jwtService.signAsync(payload),
    };
  }
}
