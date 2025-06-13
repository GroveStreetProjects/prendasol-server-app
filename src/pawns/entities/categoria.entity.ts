import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Articulos } from './articulo.entity';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 50, unique: true })
  Nombre: string;

  @OneToMany(() => Articulos, articulo => articulo.Categoria)
  Articulos: Articulos[];
}
