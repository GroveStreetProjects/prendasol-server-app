import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { PawnsService } from './pawns.service';
import { CreatePawnTransactionDto } from './dto/create-pawn-transaction.dto';
import { extname } from 'path';

@Controller()
export class PawnsController {
  constructor(private readonly pawnsService: PawnsService) { }

  @Post('registrar-empenio')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createPawnTransaction(

    @Body() transactionData: CreatePawnTransactionDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('Nuevo emepeño')
    const articuloDetalle = transactionData.detalles

    const serviceData = {
      empleadoId: transactionData.empleadoId,
      cliente: transactionData.cliente,
      articulo: transactionData.articulo,
      articuloDetalle: articuloDetalle,
    };

    return this.pawnsService.processPawnTransaction(serviceData, files);
  }

  @Patch(':id/recoger')
  recogerArticulo(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.pawnsService.recogerArticulo(id);
  }

  @Get('cliente/:ci')
  findEmpeñosByClienteCI(@Param('ci') ci: string) {
    return this.pawnsService.findEmpeniosByClienteCI(ci);
  }
}
