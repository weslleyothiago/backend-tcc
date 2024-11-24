import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getPerfilIdByUsuarioId(usuarioId: number): Promise<number | null> {
    // Consulta o usuário e inclui o perfil associado
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      include: {
        Perfis: true, // Inclui o perfil associado ao usuário
      },
    });

    // Verifica se o usuário existe e tem um perfil associado
    if (usuario && usuario.Perfis.length > 0) {
      return usuario.Perfis[0].id;  // Retorna o id do perfil
    }

    return null;  // Se não houver perfil ou usuário
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    const user = await this.prisma.usuario.findUnique({
      where: {email},
    });
    return user ? true : false;
  }

  async login(user: User): Promise<UserToken> {
    // Obtém o profileId de forma assíncrona
    const profileId = await this.getPerfilIdByUsuarioId(user.id);  // Aguarda a resposta
  
    if (!profileId) {
      throw new Error('Perfil não encontrado para o usuário.');
    }
  
    // Transforma o user em JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      type: user.tipo,
      profileId: profileId,  // Inclui o profileId no payload
    };
  
    const jwtToken = this.jwtService.sign(payload);
  
    // Decodificando o JWT para exibir o conteúdo (para debugging)
    const decoded = jwt.decode(jwtToken);
    console.log("conteúdo do token: ", decoded);  // Exibe o conteúdo do JWT
  
    return {
      access_token: jwtToken,
    };
  }
  
  

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      // Checar se a senha informada corresponde a hash que está no banco
      const isPasswordValid = await bcrypt.compare(password, user.senha);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    // Se chagar aqui, siginifica que não encontrou um user e/ou a senha não corresponde
    throw new Error('Email ou password icorreto.');
  }
}
