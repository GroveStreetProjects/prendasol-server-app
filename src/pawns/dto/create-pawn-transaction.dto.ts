import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, ValidateNested, IsObject, IsOptional } from 'class-validator';
import { CreateClienteDto } from './create-cliente.dto';
import { CreateArticuloDto } from './create-articulo.dto';

class TransactionClienteDto extends CreateClienteDto {
  @IsInt()
  @IsOptional()
  Id?: number;
}

export class CreatePawnTransactionDto {
  @IsInt()
  @IsNotEmpty()
  empleadoId: number;

  @IsObject()
  @ValidateNested()
  @Type(() => TransactionClienteDto)
  cliente: TransactionClienteDto;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateArticuloDto)
  articulo: CreateArticuloDto;


  @IsObject()
  @IsOptional()
  articuloDetalle?: object;

  @IsObject()
  @IsOptional()
  detalles?: object;
}
