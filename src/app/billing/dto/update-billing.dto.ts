import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  Min,
  min,
} from 'class-validator';

export class UpdateBillingDto {
  @IsNotEmpty({ message: 'Preencha o valor ' })
  @Type(() => Number)
  @Min(1, { message: 'O valor minimo é 1' })
  value: number;
  @MaxLength(255, { message: 'Tamanho maximo é de 255 caracteres' })
  @IsNotEmpty({ message: 'Preencha a descrição' })
  description: string;
  @IsNotEmpty()
  @IsDateString(undefined, { message: 'Preencha uma data valida' })
  dueDate: string;
  @IsNotEmpty({ message: 'Selecione um cliente' })
  @IsUUID('4', { message: 'O id do cliente é invalido' })
  customerId: string;
}
