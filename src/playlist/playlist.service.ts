import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Ajuste o caminho para o seu projeto

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

    // Método para adicionar música à playlist
    async addToPlaylist(playlistId: number, musicaId: number) {
      if (!musicaId || !playlistId) {
        throw new Error('ID da música ou da playlist não fornecido');
      }
    
      return this.prisma.playlistMusica.create({
        data: {
          playlist: {
            connect: { id: playlistId },  // Conecta a playlist existente
          },
          musica: {
            connect: { id: musicaId },  // Conecta a música existente
          },
        },
      });
    }
    

    async getPlaylistsByProfile(profileId: number) {
      return this.prisma.playlist.findMany({
        where: {
          PerfisPlaylists: {
            some: { perfilId: profileId },
          },
        },
        include: {
          PlaylistMusica: {
            include: {
              musica: {
                include: {
                  MusicaArtista: {
                    include: {artista: true}
                  }
                }
              }, // Inclui os detalhes da música vinculada
            },
          },
          PerfisPlaylists: true,
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
