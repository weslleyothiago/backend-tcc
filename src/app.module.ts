import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {ConfigModule} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { MusicModule } from './music/music.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { YoutubeModule } from './youtube/youtube.module';
import { SlugModule } from './slug/slug.module';
import { SlugService } from './slug/slug.service';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [
    PrismaModule, 
    UserModule, 
    AuthModule, 
    MusicModule, 
    YoutubeModule, 
    ConfigModule.forRoot({
    isGlobal: true,
  }), SlugModule, ArtistModule],
  controllers: [AppController],
  providers: [
    SlugService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [SlugService],
})
export class AppModule {}
