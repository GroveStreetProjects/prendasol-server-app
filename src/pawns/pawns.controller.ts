import { BadRequestException, Body, Controller, Post, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PawnsService } from './pawns.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('pawns')
export class PawnsController {
  constructor(private readonly pawnsService: PawnsService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'pdf', maxCount: 1 },
      { name: 'imagen', maxCount: 1 },
    ]),
  )
  async createPawn(
    @Body() newPawn: any,
    @UploadedFiles() files: { pdf?: Express.Multer.File[], imagen?: Express.Multer.File[] },
  ) {

    if (!files || !files.imagen || !files.imagen[0]) {
      throw new BadRequestException('El archivo de imagen es requerido.');
    }
    if (!files || !files.pdf || !files.pdf[0]) {
      throw new BadRequestException('El archivo PDF es requerido.');
    }


    const imageFile = files.imagen[0];
    const pdfFile = files.pdf ? files.pdf[0] : null;

    // console.log('DTO:', newPawn);
    // console.log('Image:', imageFile);
    // console.log('PDF:', pdfFile);


    return this.pawnsService.createPawnProcess(newPawn, imageFile, pdfFile);
  }
}
