import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfileDto } from '../user/dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @IsPublic()
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

}
