import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    fotoPerfil?: string;

    @IsDateString()
    dataNascimento: string;

    @IsString()
    slug: string;

    @IsInt()
    fkUsuarioId: number;

}
