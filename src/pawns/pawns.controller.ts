import { Controller, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { PawnsService } from './pawns.service';

@Controller('registrar-empenio')
export class PawnsController {
  constructor(private readonly pawnsService: PawnsService) { }

  @Post('')
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
  async registrarEmpenio(
    @Body() data: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {

    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

    return this.pawnsService.processPawnTransaction(parsedData, files);
  }
}