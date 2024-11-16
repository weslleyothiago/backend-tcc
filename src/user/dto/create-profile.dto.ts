import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    nome: string;

    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    fotoPerfil?: string;

    @IsDateString()
    dataNascimento: string;

    @IsInt()
    fkUsuarioId: number;
}
