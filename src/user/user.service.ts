import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto'; // DTO do perfil
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, createProfileDto: CreateProfileDto) {
    // Hash da senha do usuário
    const data = {
      ...createUserDto,
      senha: await bcrypt.hash(createUserDto.senha, 10),
    };

    // Inicia uma transação para criar o usuário e o perfil simultaneamente
    const createdUser = await this.prisma.$transaction(async (prisma) => {
      // Criação do usuário
      const user = await prisma.usuario.create({ data });

      // Criação do perfil associado ao usuário recém-criado
      const profile = await prisma.perfil.create({
        data: {
          nome: createProfileDto.nome,
          fotoPerfil: createProfileDto.fotoPerfil,
          dataNascimento: new Date(createProfileDto.dataNascimento),
          slug: createProfileDto.slug,
          fkUsuarioId: user.id, // Associando o perfil ao usuário
        },
      });

      return { user, profile };  // Retorna o usuário e o perfil criados
    });

    // Retorna o usuário e o perfil criado sem a senha
    return {
      user: {
        ...createdUser.user,
        senha: undefined,  // Não retorna a senha do usuário
      },
      profile: createdUser.profile, // Retorna o perfil criado
    };
  }

  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }
}
