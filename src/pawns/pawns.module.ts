import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PawnsController } from './pawns.controller';
import { PawnsService } from './pawns.service';

import { Cliente } from './entities/cliente.entity';
import { CelularCliente } from './entities/celular-cliente.entity';
import { CorreoCliente } from './entities/correo-cliente.entity';
import { Articulos } from './entities/articulo.entity';
import { Fotocopia } from './entities/fotocopia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cliente,
      CelularCliente,
      CorreoCliente,
      Articulos,
      Fotocopia,
    ]),
  ],
  controllers: [PawnsController],
  providers: [PawnsService],
})
export class PawnsModule { }