import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsNotEmpty()
  @IsInt()
  profileId: number;

  @IsOptional()
  @IsString()
  slug?: string;
}
