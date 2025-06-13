import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Articulos } from './articulo.entity';
import { Fotocopia } from './fotocopia.entity';
import { Correos } from './correo.entity';
import { Telefonos } from './telefono.entity';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 50 })
  Nombres: string;

  @Column({ length: 30 })
  Paterno: string;

  @Column({ length: 30, nullable: true })
  Materno?: string;

  @Column({ length: 15, unique: true })
  CI: string;

  @Column({ length: 255 })
  Contrasena: string;

  @OneToMany(() => Articulos, articulo => articulo.Cliente)
  Articulos: Articulos[];

  @OneToMany(() => Fotocopia, fotocopia => fotocopia.Cliente)
  Fotocopias: Fotocopia[];

  @OneToMany(() => Correos, correo => correo.Cliente)
  Correos: Correos[];

  @OneToMany(() => Telefonos, telefono => telefono.Cliente)
  Telefonos: Telefonos[];
}
