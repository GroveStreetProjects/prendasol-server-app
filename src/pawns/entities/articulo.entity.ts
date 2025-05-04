import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('articulos')
export class Articulos {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'Id_Cliente' })
  Id_Cliente: number;

  @Column({ name: 'Id_Empleado', nullable: true })
  Id_Empleado?: number;

  @Column({ name: 'Id_Categoria', nullable: true })
  Id_Categoria?: number;

  @Column({ length: 50 })
  Nombre: string;

  @Column({ length: 30, nullable: true })
  Imagen?: string;

  @Column({ name: 'Id_Fotocopia', nullable: true })
  Id_Fotocopia?: number;

  @Column({ type: 'double', precision: 9, scale: 2, name: 'Precio_Empeno' })
  Precio_Empeno: number;

  @Column({ type: 'double', precision: 8, scale: 2 })
  Utilidad: number;

  @Column({ type: 'date', name: 'Fecha_Ingreso' })
  Fecha_Ingreso: Date;

  @Column({ type: 'date', name: 'Fecha_Limite' })
  Fecha_Limite: Date;

  @Column({ length: 10, name: 'Estado_Articulo' })
  Estado_Articulo: string;

  @Column({ type: 'date', nullable: true, name: 'Fecha_Recogida' })
  Fecha_Recogida?: Date;

  @Column({ type: 'date', nullable: true, name: 'Fecha_Venta' })
  Fecha_Venta?: Date;

  @ManyToOne(() => Cliente, cliente => cliente.articulos)
  @JoinColumn({ name: 'Id_Cliente' })
  cliente: Cliente;
}