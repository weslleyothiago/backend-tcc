import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SlugService } from 'src/slug/slug.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    try{

      const artistSlug = this.slugService.generateSlug(createArtistDto.nome);

      const createdArtist = await this.prisma.artista.create({
        data: {
          nome: createArtistDto.nome,
          slug: artistSlug,
         }
      });
      return createdArtist;
    }catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(`O campo '${error.meta.target}' já está em uso.`);
      }
      throw error;
    }
  }

  async searchArtists(query: string) {
    return this.prisma.artista.findMany({
      where: {
        nome: {
          contains: query,
        },
      },
      select: { id:true, nome: true},
      take: 10,
    });
  }

  findAll() {
    return `This action returns all artist`;
  }


}
