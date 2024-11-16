import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProfileDto } from '../user/dto/create-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto) {
    try {
      const createdProfile = await this.prisma.perfil.create({
        data: { ...createProfileDto },
      });
      return createdProfile;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(`O campo '${error.meta.target}' já está em uso.`);
      }
      throw error;
    }
  }
}
