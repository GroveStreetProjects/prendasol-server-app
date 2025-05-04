import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('correos_cliente')
export class CorreoCliente {
  @PrimaryColumn({ name: 'Id_Cliente' })
  Id_Cliente: number;

  @Column({ name: 'Correo', length: 50 })
  Correo: string;

  @ManyToOne(() => Cliente, cliente => cliente.correos)
  @JoinColumn({ name: 'Id_Cliente' })
  cliente: Cliente;
}