import { IsString, IsNotEmpty, IsNumber, Min, IsInt, Length } from 'class-validator';

export class CreateArticuloDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  Nombre: string;

  @IsNumber()
  @Min(0.01)
  Precio_Empeno: number;

  @IsInt()
  @IsNotEmpty()
  CategoriaId: number;

  @IsInt()
  @IsNotEmpty()
  tipo: number;

  @IsString()
  @IsNotEmpty()
  Descripcion: string;
}
