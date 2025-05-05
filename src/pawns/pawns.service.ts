import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

import { Cliente } from './entities/cliente.entity';
import { CelularCliente } from './entities/celular-cliente.entity';
import { CorreoCliente } from './entities/correo-cliente.entity';
import { Articulos } from './entities/articulo.entity';
import { Fotocopia } from './entities/fotocopia.entity';

import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { CreateFotocopiaDto } from './dto/create-fotocopia.dto';

@Injectable()
export class PawnsService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(CelularCliente)
    private celularRepository: Repository<CelularCliente>,
    @InjectRepository(CorreoCliente)
    private correoRepository: Repository<CorreoCliente>,
    @InjectRepository(Articulos)
    private articuloRepository: Repository<Articulos>,
    @InjectRepository(Fotocopia)
    private fotocopiaRepository: Repository<Fotocopia>,
  ) { }

  generatePassword(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  hashSHA256(text: string): string {
    return crypto
      .createHash('sha256')
      .update(text)
      .digest('hex');
  }

  calculateUtility(price: number): number {
    const utility = price * 0.1;
    return Math.floor(utility * 100) / 100;
  }

  async getMaxArticleId(): Promise<number> {
    const [lastArticle] = await this.articuloRepository.find({
      order: { Id: 'DESC' },
      take: 1
    });

    return lastArticle?.Id || 0;
  }

  async createCliente(createClienteDto: CreateClienteDto) {

    const cliente = this.clienteRepository.create({
      Nombres: createClienteDto.Nombres,
      Paterno: createClienteDto.Paterno,
      Materno: createClienteDto.Materno,
      CI: createClienteDto.CI,
      Contrasena: createClienteDto.Contrasena,
    });

    const savedCliente = await this.clienteRepository.save(cliente);

    const celular = this.celularRepository.create({
      Id_Cliente: savedCliente.Id,
      Celular: createClienteDto.Celular,
    });
    await this.celularRepository.save(celular);

    const correo = this.correoRepository.create({
      Id_Cliente: savedCliente.Id,
      Correo: createClienteDto.Correo,
    });
    await this.correoRepository.save(correo);

    return savedCliente;
  }

  async createArticulo(createArticuloDto: CreateArticuloDto) {
    const articulo = this.articuloRepository.create(createArticuloDto);
    return await this.articuloRepository.save(articulo);
  }

  async createFotocopia(createFotocopiaDto: CreateFotocopiaDto) {
    const fotocopia = this.fotocopiaRepository.create(createFotocopiaDto);
    return await this.fotocopiaRepository.save(fotocopia);
  }

  async processPawnTransaction(data: any, files: Array<Express.Multer.File>) {

    let cliente = {
      Id: 0,
      CI: ''
    };

    if (!data.cliente.Id) {
      const clienteData = {
        Nombres: data.cliente.Nombres,
        Paterno: data.cliente.Paterno,
        Materno: data.cliente.Materno,
        CI: data.cliente.CI,
        Contrasena: this.hashSHA256(this.generatePassword()),
        Celular: data.cliente.Telefono,
        Correo: data.cliente.Correo,
      };

      cliente = await this.createCliente(clienteData);
    } else {
      cliente.CI = data.cliente.CI;
      cliente.Id = data.cliente.Id;
    }

    const clienteId = cliente.Id;
    const articuloId = await this.getMaxArticleId();
    const ci = cliente.CI;

    const timestamp = new Date().toLocaleString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: false
    }).replace(/[\/\s,:]/g, '');

    const renamedFiles = await Promise.all(files.map((file, i) => {
      const newName = i === 0
        ? `${timestamp}_${clienteId}_${ci}.pdf`
        : `${timestamp}_${articuloId + 1}${path.extname(file.originalname)}`;
      const newPath = path.join(path.dirname(file.path), newName);
      fs.renameSync(file.path, newPath);
      return newName;
    }));

    let fotocopiaId: any;
    if (files && files.length > 0) {
      const fotocopiaData = {
        Id_Cliente: cliente.Id,
        Imagen: renamedFiles[0],
      };
      const fotocopia = await this.createFotocopia(fotocopiaData);
      fotocopiaId = fotocopia.Id;
    }

    const limite = 30;
    const fechaIngreso = new Date();
    const fechaLimite = new Date(fechaIngreso);
    fechaLimite.setDate(fechaLimite.getDate() + limite);

    const articuloData = {
      ...data.articulo,
      Id_Cliente: cliente.Id,
      Id_Fotocopia: fotocopiaId,
      Imagen: renamedFiles[1],
      Utilidad: this.calculateUtility(data.articulo.Precio_Empeno),
      Fecha_Ingreso: fechaIngreso,
      Fecha_Limite: fechaLimite,
      Estado_Articulo: 'Empeñado',
    };

    const articulo = await this.createArticulo(articuloData);

    return {
      cliente,
      articulo,
    };
  }

}