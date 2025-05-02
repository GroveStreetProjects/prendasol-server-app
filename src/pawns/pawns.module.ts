import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

import { PawnsController } from './pawns.controller';
import { PawnsService } from './pawns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelularesCliente, Cliente, CorreosCliente } from 'src/client/client.entity';
import { Articulo, Fotocopia } from 'src/article/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cliente,
      CelularesCliente,
      CorreosCliente,
      Articulo,
      Fotocopia,
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/pawns',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Tipo de archivo no soportado'), false);
        }
      },
    }),
  ],
  controllers: [PawnsController],
  providers: [PawnsService]
})
export class PawnsModule { }
