import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SlugModule } from 'src/slug/slug.module';

@Module({
  imports: [PrismaModule, SlugModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
