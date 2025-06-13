import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Articulos } from './articulo.entity';

@Entity('piedras')
export class Piedras {
  @PrimaryColumn({ name: 'articulo_id' })
  ArticuloId: number;

  @Column({ length: 50, nullable: true })
  Tipo?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  Quilataje?: number;

  @Column({ length: 50, nullable: true })
  Color?: string;

  @Column({ name: 'peso_gr', type: 'decimal', precision: 10, scale: 2, nullable: true })
  PesoGr?: number;

  @OneToOne(() => Articulos, articulo => articulo.Piedra)
  @JoinColumn({ name: 'articulo_id' })
  Articulo: Articulos;
}