import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMusicDto } from './dto/create-music.dto';

@Injectable()
export class MusicService {
  constructor(private readonly prisma: PrismaService) {}

  // Método para criar apenas a música
  async create(data: CreateMusicDto) {
    return this.prisma.musica.create({
      data: {
        titulo: data.title,
        duracao: data.duration,
        link: data.link,
        slug: data.slug,
        fkGeneroMusicalId: data.genreId,
      },
    });
  }

  // Método para criar a relação entre a música e o artista
  async createMusicArtistRelation(data: { musicaId: number; artistaId: number }) {
    return this.prisma.musicaArtista.create({
      data: {
        musicaId: data.musicaId,
        artistaId: data.artistaId,
      },
    });
  }

  // Encontrar todas as músicas
  async findAll() {
    return this.prisma.musica.findMany({
      include: {
        generoMusical: true,
      },
    });
  }

  // Encontrar todos os gêneros
  async findAllGenres() {
    return this.prisma.genero.findMany();
  }

  // Encontrar uma música específica
  async findOne(id: string) {
    return this.prisma.musica.findUnique({
      where: {
        id: Number(id),
      },
    });
  }
}
