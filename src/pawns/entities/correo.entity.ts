import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Empleado } from './empleado.entity';

@Entity('correos')
export class Correos {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'email', length: 255, unique: true })
  Email: string;

  @ManyToOne(() => Cliente, cliente => cliente.Correos, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  Cliente?: Cliente;

  @ManyToOne(() => Empleado, empleado => empleado.Correos, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'empleado_id' })
  Empleado?: Empleado;
}
