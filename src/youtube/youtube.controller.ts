import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly httpService: HttpService) {}

  @Get('video-details')
  async getVideoDetails(@Query('videoId') videoId: string) {
    const apiKey = process.env.YOUTUBE_API_KEY; // Use uma variável de ambiente para a chave
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`;

    try {
      // Faz a chamada à API
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      // Trata os erros da API ou da conexão
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.response?.data?.error?.message || 'Erro desconhecido ao buscar detalhes do vídeo';
      throw new HttpException(
        `Erro ao acessar API do YouTube: ${message}`,
        status
      );
    }
  }
}
