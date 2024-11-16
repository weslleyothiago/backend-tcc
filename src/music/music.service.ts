import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMusicDto } from './dto/create-music.dto';

@Injectable()
export class MusicService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMusicDto) {
    return this.prisma.musica.create({ 
      data: {
        titulo: data.title, // Mapeando title para titulo
        duracao: data.duration, // Mapeando duration para duracao
        link: data.link,
        slug: data.slug,
        fkGeneroMusicalId: data.genreId, // Mapeando genreId para fkGeneroMusicalId
      }
     });
  }

  async findAll() {
    return this.prisma.musica.findMany({
      include: {
        generoMusical: true,
      },
    });
  }

  async findAllGenres() {
    return this.prisma.genero.findMany();
  }

  async findOne (id: string) {
    return this.prisma.musica.findUnique({
      where: {
        id: Number(id)
      }
    })
  }
}
