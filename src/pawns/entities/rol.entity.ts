import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Empleado } from './empleado.entity';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 50, unique: true })
  Nombre: string;

  @OneToMany(() => Empleado, empleado => empleado.Rol)
  Empleados: Empleado[];
}
