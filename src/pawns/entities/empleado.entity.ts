import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Rol } from './rol.entity';
import { Articulos } from './articulo.entity';
import { Correos } from './correo.entity';
import { Telefonos } from './telefono.entity';

@Entity('empleado')
export class Empleado {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'rol_id' })
  RolId: number;

  @Column({ length: 50 })
  Nombres: string;

  @Column({ length: 30 })
  Paterno: string;

  @Column({ length: 15, unique: true })
  CI: string;

  @Column({ length: 30, unique: true })
  Usuario: string;

  @Column({ length: 255 })
  Contrasena: string;

  @ManyToOne(() => Rol, rol => rol.Empleados)
  @JoinColumn({ name: 'rol_id' })
  Rol: Rol;

  @OneToMany(() => Articulos, articulo => articulo.Empleado)
  Articulos: Articulos[];

  @OneToMany(() => Correos, correo => correo.Empleado)
  Correos: Correos[];

  @OneToMany(() => Telefonos, telefono => telefono.Empleado)
  Telefonos: Telefonos[];
}
