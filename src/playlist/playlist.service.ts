import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Ajuste o caminho para o seu projeto

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async getPlaylistsByProfile(profileId: number) {
    return this.prisma.playlist.findMany({
      where: {
        PerfisPlaylists: {
          some: { perfilId: profileId },
        },
      },
      include: {
        PerfisPlaylists: true, // Caso você precise de detalhes da relação
      },
    });
  }  

  async createPlaylistForProfile(title: string, profileId: number, coverImage?: string) {
    console.log('Dados recebidos:', { title, profileId, coverImage });
  
    return this.prisma.$transaction(async (tx) => {
      try {
        const playlist = await tx.playlist.create({
          data: {
            nome: title,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            capa: coverImage || null,
          },
        });
  
        console.log('Playlist criada:', playlist);
  
        await tx.perfisPlaylists.create({
          data: {
            perfilId: profileId,
            playlistId: playlist.id,
          },
        });
  
        console.log('Relação criada com o perfil.');
  
        return playlist;
      } catch (error) {
        console.error('Erro durante a transação:', error);
        throw error;
      }
    });
  }
  
}
