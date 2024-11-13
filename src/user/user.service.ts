import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      senha: await bcrypt.hash(createUserDto.senha, 10),
    };

    const createdUser = await this.prisma.usuario.create({ data });

    return {
      ...createdUser,
      senha: undefined,
    };
  }

  findOne(id: number) {
    return `This aaction return a #${id} user`;
  }
}
