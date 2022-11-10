import { IsEmail, IsNotEmpty, MaxLength, Validate } from 'class-validator';
import { cpfCnpjValidator } from 'src/validators/cpfCnpj.validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Preencha o nome' })
  @MaxLength(255, { message: 'Tamanho maximo é de 255 caracteres' })
  name: string;
  @IsNotEmpty({ message: 'Preencha um e-mail valido' })
  @MaxLength(255, { message: 'Tamanho maximo é de 255 caracteres' })
  @IsEmail(undefined, { message: 'Informe um e-mail valido' })
  email: string;
  @IsNotEmpty({ message: 'Preencha o CPF ou CNPJ' })
  @Validate(cpfCnpjValidator)
  cpfCnpj: string;
  @IsNotEmpty({ message: 'Preencha o Celular' })
  @MaxLength(255, { message: 'Tamanho maximo é de 255 caracteres' })
  celular: string;
}
