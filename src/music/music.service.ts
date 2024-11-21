import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMusicDto } from './dto/create-music.dto';

@Injectable()
export class MusicService {
  constructor(private readonly prisma: PrismaService) { }

  // Método para criar a música e a relação em uma transação
  async createMusicWithArtistRelation(
    musicData: CreateMusicDto,
    artistRelationData: { artistaId: number }
  ) {
    return this.prisma.$transaction(async (prisma) => {
      // Criar a música
      const musica = await prisma.musica.create({
        data: {
          titulo: musicData.title,
          duracao: musicData.duration,
          link: musicData.link,
          slug: musicData.slug,
          fkGeneroMusicalId: musicData.genreId,
          thumbnail: musicData.thumbnail
        },
      });

      // Criar a relação entre a música e o artista
      const musicaArtista = await prisma.musicaArtista.create({
        data: {
          musicaId: musica.id, // ID gerado no insert da música
          artistaId: artistRelationData.artistaId,
        },
      });

      return { musica, musicaArtista };
    });
  }

  async getCountsOfAdminCards(): Promise<{ musicCount: number; artistCount: number, playlistCount: number, profileCount: number }> {
    const musicCount = await this.prisma.musica.count(); 
    const artistCount = await this.prisma.artista.count();
    const playlistCount = await this.prisma.playlist.count();
    const profileCount = await this.prisma.perfil.count();

    return {
      musicCount,
      artistCount,
      playlistCount,
      profileCount
    };
  }

  // Encontrar todas as músicas
  async findAll() {
    return this.prisma.musica.findMany({
      include: {
        generoMusical: true,
        MusicaArtista: {
          include: {
            artista: true,
          }
        }
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
