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
  artist: string; 

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsInt()
  genreId: number; // Correspondente a "fkGeneroMusicalId"

  @IsNotEmpty()
  @IsString()
  thumbnail: string;
}
