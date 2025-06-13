import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Empleado } from './empleado.entity';
import { Categoria } from './categoria.entity';
import { Fotocopia } from './fotocopia.entity';
import { Joyas } from './joyas.entity';
import { Vehiculos } from './vehiculos.entity';
import { Piedras } from './piedras.entity';
import { Electrodomesticos } from './electrodomesticos.entity';

@Entity('articulos')
export class Articulos {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'nombre', length: 100 })
  Nombre: string;

  @Column({ name: 'imagen_url', length: 255, nullable: true })
  ImagenUrl?: string;

  @Column({ name: 'precio_empeno', type: 'decimal', precision: 10, scale: 2 })
  Precio_Empeno: number;

  @Column({ name: 'utilidad', type: 'decimal', precision: 10, scale: 2 })
  Utilidad: number;

  @Column({ name: 'fecha_ingreso', type: 'date' })
  FechaIngreso: Date;

  @Column({ name: 'fecha_limite', type: 'date' })
  FechaLimite: Date;

  @Column({ name: 'fecha_recogida', type: 'date', nullable: true })
  FechaRecogida?: Date;

  @Column({ name: 'fecha_venta', type: 'date', nullable: true })
  FechaVenta?: Date;

  @Column({
    name: 'estado_articulo',
    type: 'enum',
    enum: ['empeñado', 'recogido', 'vendido', 'vencido'],
  })
  EstadoArticulo: string;

  @ManyToOne(() => Cliente, cliente => cliente.Articulos)
  @JoinColumn({ name: 'cliente_id' })
  Cliente: Cliente;

  @ManyToOne(() => Empleado, empleado => empleado.Articulos)
  @JoinColumn({ name: 'empleado_id' })
  Empleado: Empleado;

  @ManyToOne(() => Categoria, categoria => categoria.Articulos)
  @JoinColumn({ name: 'categoria_id' })
  Categoria: Categoria;

  @OneToOne(() => Fotocopia)
  @JoinColumn({ name: 'fotocopia_id' })
  Fotocopia?: Fotocopia | null;

  @OneToOne(() => Joyas, joya => joya.Articulo)
  Joya: Joyas;

  @OneToOne(() => Joyas, joya => joya.Articulo)
  Piedra: Piedras;

  @OneToOne(() => Joyas, joya => joya.Articulo)
  Electrodomestico: Electrodomesticos;

  @OneToOne(() => Vehiculos, vehiculo => vehiculo.Articulo)
  Vehiculo: Vehiculos;
}
