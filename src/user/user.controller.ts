import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async create(@Body() body: { createUserDto: CreateUserDto, createProfileDto: CreateProfileDto }) {
    console.log('Received body:', body);  // Adicione um log para verificar os dados recebidos
    const { createUserDto, createProfileDto } = body;
    return this.userService.create(createUserDto, createProfileDto);
  }
  
}
