import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async checkIfEmailExists(email: string): Promise<boolean> {
    const user = await this.prisma.usuario.findUnique({
      where: {email},
    });
    return user ? true : false;
  }

  login(user: User): UserToken {
    // Transforma o user em JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      type: user.tipo,
    };

    const jwtToken = this.jwtService.sign(payload);
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
