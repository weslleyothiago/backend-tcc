import { Module } from '@nestjs/common';
import { YoutubeController } from './youtube.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [YoutubeController]
})
export class YoutubeModule {}
