import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto'; // DTO do perfil
import * as bcrypt from 'bcrypt';
import { SlugService } from 'src/slug/slug.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService
  ) {}

  async create(createUserDto: CreateUserDto, createProfileDto: CreateProfileDto) {
    const profileSlug = this.slugService.generateSlug(createProfileDto.nome)
    
    const data = {
      ...createUserDto,
      senha: await bcrypt.hash(createUserDto.senha, 10),
    };

    // Inicia uma transação para criar o usuário e o perfil simultaneamente
    const createdUser = await this.prisma.$transaction(async (prisma) => {

      const user = await prisma.usuario.create({ data });

      const profile = await prisma.perfil.create({
        data: {
          nome: createProfileDto.nome,
          fotoPerfil: createProfileDto.fotoPerfil,
          dataNascimento: new Date(createProfileDto.dataNascimento),
          slug: profileSlug,
          fkUsuarioId: user.id,
        },
      });

      return { user, profile };
    });

    return {
      user: {
        ...createdUser.user,
        senha: undefined,
      },
      profile: createdUser.profile,
    };
  }

  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }
}
