import { Body, Controller, Param, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  async createPlaylist(@Body() createPlaylistDto: { title: string; coverImage: string }) {
    const { title, coverImage } = createPlaylistDto;
    return this.playlistService.createPlaylist(title, coverImage);
  }

  @Post(':id/add-music')
  async addMusicToPlaylist(
    @Param('id') playlistId: number,
    @Body() addMusicDto: { perfilId: number; musicIds: number[] },
  ) {
    const { perfilId, musicIds } = addMusicDto;
    return this.playlistService.addMusicToPlaylist(playlistId, perfilId, musicIds);
  }
}
