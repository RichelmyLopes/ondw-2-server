import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;
  @MaxLength(255)
  @IsNotEmpty()
  lastName: string;
  @MaxLength(255)
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
