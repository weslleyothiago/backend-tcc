import { IsEmail, IsEnum, IsString, Matches, MinLength } from 'class-validator';
import { UsuarioTipo } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail({}, { message: 'E-mail não está nos padrões' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, {
    message:
      'Senha deve conter letras e números, e ter no mínimo 8 caracteres.',
  })
  senha: string;

  @IsEnum(UsuarioTipo, { message: 'Tipo de usuário inválido' })
  tipo: UsuarioTipo;
}
