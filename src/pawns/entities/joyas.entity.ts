import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Articulos } from './articulo.entity';

@Entity('joyas')
export class Joyas {
  @PrimaryColumn({ name: 'articulo_id' })
  ArticuloId: number;

  @Column({ length: 50 })
  Material: string;

  @Column({ length: 50, nullable: true })
  Tipo?: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  Kilataje?: number;

  @Column({ name: 'peso_gr', type: 'decimal', precision: 10, scale: 2, nullable: true })
  PesoGr?: number;

  @OneToOne(() => Articulos, articulo => articulo.Joya)
  @JoinColumn({ name: 'articulo_id' })
  Articulo: Articulos;
}
