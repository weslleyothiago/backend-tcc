import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateMusicDto {
  @IsNotEmpty()
  @IsString()
  title: string; // Correspondente a "titulo"

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsString()
  artist: string; // Essa propriedade será tratada em outro lugar

  @IsNotEmpty()
  @IsString()
  duration: string; // Correspondente a "duracao"

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsInt()
  genreId: number; // Correspondente a "fkGeneroMusicalId"
}
