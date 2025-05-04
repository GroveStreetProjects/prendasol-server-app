import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CelularCliente } from './celular-cliente.entity';
import { CorreoCliente } from './correo-cliente.entity';
import { Articulos } from './articulo.entity';
import { Fotocopia } from './fotocopia.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 50 })
  Nombres: string;

  @Column({ length: 30 })
  Paterno: string;

  @Column({ length: 30, nullable: true })
  Materno: string;

  @Column({ length: 12 })
  CI: string;

  @Column({ length: 100 })
  Contrasena: string;

  @OneToMany(() => CelularCliente, celular => celular.cliente)
  celulares: CelularCliente[];

  @OneToMany(() => CorreoCliente, correo => correo.cliente)
  correos: CorreoCliente[];

  @OneToMany(() => Articulos, articulo => articulo.cliente)
  articulos: Articulos[];

  @OneToMany(() => Fotocopia, fotocopia => fotocopia.cliente)
  fotocopias: Fotocopia[];
}