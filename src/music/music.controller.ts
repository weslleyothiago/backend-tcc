import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('musics')
export class MusicController {
  constructor(
    private readonly musicService: MusicService
  ) {}

  @Post('')
  async create(@Body() data: {
    music: CreateMusicDto;
    artistRelation: {artistaId: number};
  }) {
    const {music, artistRelation} = data;
    return this.musicService.createMusicWithArtistRelation(music, artistRelation);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return this.musicService.findAll();
  }

  @IsPublic()
  @Get('genres')
  async findAllGenres() {
    return this.musicService.findAllGenres()
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.musicService.findOne(id);
  }
}