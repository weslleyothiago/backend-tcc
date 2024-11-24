export enum UsuarioTipo {
  Administrador = 'Administrador',
  Cliente = 'Cliente',
}

export class User {
  id?: number;
  email: string;
  senha: string;
  tipo: UsuarioTipo;
  createdAt?: Date;
  updatedAt?: Date;
}