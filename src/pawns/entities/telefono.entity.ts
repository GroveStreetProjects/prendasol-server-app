import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Empleado } from './empleado.entity';

@Entity('telefonos')
export class Telefonos {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'telefono', length: 20, unique: true })
  Telefono: string;

  @ManyToOne(() => Cliente, cliente => cliente.Telefonos, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  Cliente?: Cliente;

  @ManyToOne(() => Empleado, empleado => empleado.Telefonos, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'empleado_id' })
  Empleado?: Empleado;
}
