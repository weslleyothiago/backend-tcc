import { UsuarioTipo } from '@prisma/client';

export interface UserPayload {
  sub: number;
  profileId: number;
  email: string;
  type: UsuarioTipo;
  iat?: number;
  exp?: number;
}
