import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SlugService } from 'src/slug/slug.service';

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

  findAll() {
    return `This action returns all artist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

}
