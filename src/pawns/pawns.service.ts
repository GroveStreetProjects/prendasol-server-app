import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articulo, Fotocopia } from 'src/article/article.entity';
import { CelularesCliente, Cliente, CorreosCliente } from 'src/client/client.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PawnsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
    @InjectRepository(CelularesCliente) private celularesRepository: Repository<CelularesCliente>,
    @InjectRepository(CorreosCliente) private correosRepository: Repository<CorreosCliente>,
    @InjectRepository(Articulo) private articuloRepository: Repository<Articulo>,
    @InjectRepository(Fotocopia) private fotocopiasRepository: Repository<Fotocopia>,
  ) { }

  async createPawnProcess(
    pawn: any,
    imageFile: Express.Multer.File,
    pdfFile: Express.Multer.File | null,
  ): Promise<any> { }
}
