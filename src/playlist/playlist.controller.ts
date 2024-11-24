import { Controller, Post, Body } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    const { title, profileId, coverImage } = createPlaylistDto;
    return this.playlistService.createPlaylistForProfile(title, profileId, coverImage);
  }
}
