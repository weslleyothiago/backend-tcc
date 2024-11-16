export class Profile {
  id?: number;
  nome: string;
  fotoPerfil: string;
  slug: string;
  fkUsuarioId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
