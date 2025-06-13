import { IsString, IsNotEmpty, IsOptional, IsEmail, IsNumberString, Length } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  Nombres: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  Paterno: string;

  @IsString()
  @IsOptional()
  @Length(2, 30)
  Materno?: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 15)
  CI: string;

  @IsEmail()
  @IsNotEmpty()
  Correo: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(7, 15)
  Telefono: string;
}
