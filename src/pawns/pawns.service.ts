import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

import { Cliente } from './entities/cliente.entity';
import { Articulos } from './entities/articulo.entity';
import { Fotocopia } from './entities/fotocopia.entity';
import { Correos } from './entities/correo.entity';
import { Telefonos } from './entities/telefono.entity';

import { Joyas } from './entities/joyas.entity';
import { CreatePawnTransactionDto } from './dto/create-pawn-transaction.dto';
import { Vehiculos } from './entities/vehiculos.entity';
import { Electrodomesticos } from './entities/electrodomesticos.entity';
import { Piedras } from './entities/piedras.entity';

@Injectable()
export class PawnsService {
  constructor(
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
    @InjectRepository(Articulos) private articuloRepository: Repository<Articulos>,
    @InjectRepository(Fotocopia) private fotocopiaRepository: Repository<Fotocopia>,
    @InjectRepository(Correos) private correoRepository: Repository<Correos>,
    @InjectRepository(Telefonos) private telefonoRepository: Repository<Telefonos>,
    @InjectRepository(Joyas) private joyasRepository: Repository<Joyas>,
    @InjectRepository(Piedras) private piedrasRepository: Repository<Piedras>,
    @InjectRepository(Electrodomesticos) private electrodomesticosRepository: Repository<Electrodomesticos>,
    @InjectRepository(Vehiculos) private vehiculosRepository: Repository<Vehiculos>,
  ) { }

  async processPawnTransaction(data: CreatePawnTransactionDto, files: Array<Express.Multer.File>) {
    let cliente: Cliente;
    const clienteExistente = await this.clienteRepository.findOneBy({ CI: data.cliente.CI });

    if (clienteExistente) {
      cliente = clienteExistente;
    } else {
      const nuevoCliente = this.clienteRepository.create({
        Nombres: data.cliente.Nombres,
        Paterno: data.cliente.Paterno,
        Materno: data.cliente.Materno,
        CI: data.cliente.CI,
        Contrasena: this.hashSHA256(this.generatePassword()),
      });
      cliente = await this.clienteRepository.save(nuevoCliente);

      if (data.cliente.Correo) {
        const correo = this.correoRepository.create({ Email: data.cliente.Correo, Cliente: { Id: cliente.Id } });
        await this.correoRepository.save(correo);
      }
      if (data.cliente.Telefono) {
        const telefono = this.telefonoRepository.create({ Telefono: data.cliente.Telefono, Cliente: { Id: cliente.Id } });
        await this.telefonoRepository.save(telefono);
      }
    }

    const { fotocopiaUrl, articuloImageUrl } = this.handleFileUploads(files, cliente);

    let fotocopiaGuardada: Fotocopia | null = null;
    if (fotocopiaUrl) {
      const fotocopia = this.fotocopiaRepository.create({
        ImagenUrl: fotocopiaUrl,
        Cliente: { Id: cliente.Id },
      });
      fotocopiaGuardada = await this.fotocopiaRepository.save(fotocopia);
    }

    const fechaIngreso = new Date();
    const fechaLimite = new Date(fechaIngreso);
    fechaLimite.setDate(fechaLimite.getDate() + 30);

    const articulo = new Articulos();

    articulo.Nombre = data.articulo.Nombre;
    articulo.Precio_Empeno = data.articulo.Precio_Empeno;
    articulo.Utilidad = this.calculateUtility(data.articulo.Precio_Empeno);
    articulo.FechaIngreso = fechaIngreso;
    articulo.FechaLimite = fechaLimite;
    articulo.EstadoArticulo = 'empeñado';
    articulo.ImagenUrl = articuloImageUrl ? articuloImageUrl : undefined;
    articulo.Cliente = cliente;
    articulo.Empleado = { Id: 1 } as any;
    articulo.Categoria = { Id: data.articulo.tipo } as any;
    articulo.Fotocopia = fotocopiaGuardada;

    const articuloGuardado = await this.articuloRepository.save(articulo);

    const articuloDetalle = data.articuloDetalle;

    await this.createArticuloDetalle(articuloGuardado.Id, data.articulo.tipo, articuloDetalle);

    return { cliente, articulo: articuloGuardado };
  }

  async recogerArticulo(articuloId: number): Promise<Articulos> {
    const articulo = await this.articuloRepository.findOneBy({ Id: articuloId });
    if (!articulo) {
      throw new NotFoundException(`El artículo con ID ${articuloId} no fue encontrado.`);
    }
    if (articulo.EstadoArticulo !== 'empeñado') {
      throw new BadRequestException(`El artículo no se puede recoger porque su estado es '${articulo.EstadoArticulo}'.`);
    }
    articulo.EstadoArticulo = 'recogido';
    articulo.FechaRecogida = new Date();
    return this.articuloRepository.save(articulo);
  }

  async findEmpeniosByClienteCI(ci: string): Promise<Articulos[]> {
    const articulos = await this.articuloRepository.find({
      where: {
        Cliente: { CI: ci },
      },
      relations: ['Cliente', 'Categoria'],
    });
    if (!articulos || articulos.length === 0) {
      return [];
    }
    return articulos;
  }

  private async createArticuloDetalle(articuloId: number, categoriaId: number, detalleData: any) {
    if (categoriaId == 1) {
      const joya = new Joyas();
      joya.ArticuloId = articuloId;
      joya.Material = detalleData.material;
      joya.Tipo = detalleData.tipo;
      joya.Kilataje = parseFloat(detalleData.kilataje);
      joya.PesoGr = parseFloat(detalleData.peso_gr);
      await this.joyasRepository.save(joya);
    } else if (categoriaId == 4) {
      const vehiculo = new Vehiculos();
      vehiculo.ArticuloId = articuloId;
      vehiculo.Tipo = detalleData.tipo;
      vehiculo.Marca = detalleData.marca;
      vehiculo.Modelo = detalleData.modelo;
      vehiculo.Placa = detalleData.placa;
      vehiculo.NumChasis = detalleData.num_chasis;
      vehiculo.Kilometraje = parseInt(detalleData.kilometraje, 10);
      vehiculo.EstadoGeneral = detalleData.estado_general;
      vehiculo.Color = detalleData.color;
      await this.vehiculosRepository.save(vehiculo);
    }

    else if (categoriaId == 3) {
      const electrodomestico = new Electrodomesticos();
      electrodomestico.ArticuloId = articuloId;
      electrodomestico.Tipo = detalleData.tipo;
      electrodomestico.Marca = detalleData.marca;
      electrodomestico.Modelo = detalleData.modelo;
      electrodomestico.Estado = detalleData.estado;
      await this.electrodomesticosRepository.save(electrodomestico);
    }

    else if (categoriaId == 2) {
      const piedra = new Piedras();
      piedra.ArticuloId = articuloId;
      piedra.Tipo = detalleData.tipo;
      piedra.Quilataje = parseFloat(detalleData.quilataje);
      piedra.Color = detalleData.color;
      piedra.PesoGr = parseFloat(detalleData.peso_gr);
      await this.piedrasRepository.save(piedra);
    } else {
      console.warn(`No se encontró una tabla de detalle para la categoría ID: ${categoriaId}`);
    }
  }

  private handleFileUploads(files: Array<Express.Multer.File>, cliente: Cliente): { fotocopiaUrl: string | null, articuloImageUrl: string | null } {
    if (!files || files.length === 0) {
      return { fotocopiaUrl: null, articuloImageUrl: null };
    }
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const fotocopiaFile = files.find(f => f.mimetype === 'application/pdf');
    const imagenFile = files.find(f => f.mimetype.startsWith('image/'));
    let fotocopiaUrl: string | null = null;
    if (fotocopiaFile) {
      const newName = `${timestamp}_${cliente.CI}_ci.pdf`;
      const newPath = path.join(path.dirname(fotocopiaFile.path), newName);
      fs.renameSync(fotocopiaFile.path, newPath);
      fotocopiaUrl = newName;
    }
    let articuloImageUrl: string | null = null;
    if (imagenFile) {
      const newName = `${timestamp}_${cliente.CI}_articulo${path.extname(imagenFile.originalname)}`;
      const newPath = path.join(path.dirname(imagenFile.path), newName);
      fs.renameSync(imagenFile.path, newPath);
      articuloImageUrl = newName;
    }
    return { fotocopiaUrl, articuloImageUrl };
  }

  private generatePassword(length: number = 8): string {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  }

  private hashSHA256(text: string): string {
    return crypto.createHash('sha256').update(text).digest('hex');
  }

  private calculateUtility(price: number): number {
    const utilidad = 0.10;
    return Math.floor((price * utilidad) * 100) / 100;
  }
}
