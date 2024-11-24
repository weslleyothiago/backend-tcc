import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Criar Playlist
  async createPlaylist(title: string, coverImage: string) {
    return this.prisma.playlist.create({
      data: {
        nome: title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        capa: coverImage,
      },
    });
  }

  // 2. Adicionar Música a uma Playlist com Transação
  async addMusicToPlaylist(
    playlistId: number,
    perfilId: number,
    musicIds: number[],
  ) {
    return this.prisma.$transaction(async (prisma) => {
      // Adiciona músicas na PlaylistMusica
      const playlistMusicas = musicIds.map((musicaId) => ({
        playlistId,
        musicaId,
      }));
      await prisma.playlistMusica.createMany({ data: playlistMusicas });

      // Relaciona a playlist ao perfil em PerfisPlaylists
      await prisma.perfisPlaylists.upsert({
        where: { perfilId_playlistId: { perfilId, playlistId } },
        update: {},
        create: { perfilId, playlistId },
      });

      return {
        message: 'Músicas adicionadas à playlist com sucesso!',
        playlistId,
      };
    });
  }
}
