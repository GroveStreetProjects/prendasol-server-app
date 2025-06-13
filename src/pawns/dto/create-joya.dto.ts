import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateJoyaDto {
  @IsString()
  @IsNotEmpty()
  Material: string;

  @IsString()
  @IsOptional()
  Tipo?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  Kilataje?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  PesoGr?: number;
}
