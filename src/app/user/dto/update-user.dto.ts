import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Preencha o nome' })
  @MaxLength(255, { message: 'Tamanho maximo é de 255 caracteres' })
  firstName: string;
  @IsNotEmpty({ message: 'Preencha o sobrenome' })
  @MaxLength(255, { message: 'Tamanho maximo é de 255 caracteres' })
  lastName: string;
  @IsNotEmpty({ message: 'Preencha o email' })
  @MaxLength(255, { message: 'Tamanho maximo é de 255 caracteres' })
  @IsEmail(undefined, { message: 'Informe um e-mail valido' })
  email: string;
}
