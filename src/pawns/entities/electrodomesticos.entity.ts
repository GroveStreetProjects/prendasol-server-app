import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Articulos } from './articulo.entity';

@Entity('electrodomesticos')
export class Electrodomesticos {
  @PrimaryColumn({ name: 'articulo_id' })
  ArticuloId: number;

  @Column({ length: 50, nullable: true })
  Tipo?: string;

  @Column({ length: 50, nullable: true })
  Marca?: string;

  @Column({ length: 50, nullable: true })
  Modelo?: string;

  @Column({ length: 100, nullable: true })
  Estado?: string;

  @OneToOne(() => Articulos, articulo => articulo.Electrodomestico)
  @JoinColumn({ name: 'articulo_id' })
  Articulo: Articulos;
}