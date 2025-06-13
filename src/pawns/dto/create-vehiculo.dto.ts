import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Length } from 'class-validator';

export class CreateVehiculoDto {
  @IsString()
  @IsOptional()
  Tipo?: string;

  @IsString()
  @IsOptional()
  Marca?: string;

  @IsString()
  @IsOptional()
  Modelo?: string;

  @IsString()
  @IsOptional()
  @Length(5, 15)
  Placa?: string;

  @IsString()
  @IsOptional()
  @Length(10, 50)
  NumChasis?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  Kilometraje?: number;

  @IsString()
  @IsOptional()
  EstadoGeneral?: string;

  @IsString()
  @IsOptional()
  Color?: string;
}
