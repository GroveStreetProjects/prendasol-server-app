import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Articulos } from './articulo.entity';

@Entity('vehiculos')
export class Vehiculos {
  @PrimaryColumn({ name: 'articulo_id' })
  ArticuloId: number;

  @Column({ length: 50, nullable: true })
  Tipo?: string;

  @Column({ length: 50, nullable: true })
  Marca?: string;

  @Column({ length: 50, nullable: true })
  Modelo?: string;

  @Column({ length: 15, unique: true, nullable: true })
  Placa?: string;

  @Column({ name: 'num_chasis', length: 50, unique: true, nullable: true })
  NumChasis?: string;

  @Column({ nullable: true })
  Kilometraje?: number;

  @Column({ name: 'estado_general', length: 255, nullable: true })
  EstadoGeneral?: string;

  @Column({ length: 50, nullable: true })
  Color?: string;

  @OneToOne(() => Articulos, articulo => articulo.Vehiculo)
  @JoinColumn({ name: 'articulo_id' })
  Articulo: Articulos;
}
