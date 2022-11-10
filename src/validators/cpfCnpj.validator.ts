import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'cpfCnpjValidator', async: false })
export class cpfCnpjValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    if (text?.length <= 14) {
      return cpf.isValid(text);
    }
    return cnpj.isValid(text); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'CPF ou CNPJ invalido!';
  }
}
