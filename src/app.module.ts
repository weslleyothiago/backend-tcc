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
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    PrismaModule, 
    UserModule, 
    AuthModule, 
    MusicModule, 
    YoutubeModule, 
    ConfigModule.forRoot({
    isGlobal: true,
  }), ProfileModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
