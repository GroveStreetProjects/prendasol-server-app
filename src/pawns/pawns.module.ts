import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PawnsController } from './pawns.controller';
import { PawnsService } from './pawns.service';

import { Cliente } from './entities/cliente.entity';
import { Telefonos } from './entities/telefono.entity';
import { Correos } from './entities/correo.entity';
import { Articulos } from './entities/articulo.entity';
import { Fotocopia } from './entities/fotocopia.entity';
import { Joyas } from './entities/joyas.entity';
import { Piedras } from './entities/piedras.entity';
import { Electrodomesticos } from './entities/electrodomesticos.entity';
import { Vehiculos } from './entities/vehiculos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cliente,
      Telefonos,
      Correos,
      Articulos,
      Fotocopia,
      Joyas,
      Piedras,
      Electrodomesticos,
      Vehiculos
    ]),
  ],
  controllers: [PawnsController],
  providers: [PawnsService],
})
export class PawnsModule { }