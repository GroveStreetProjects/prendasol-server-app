import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('celulares_cliente')
export class CelularCliente {
  @PrimaryColumn({ name: 'Id_Cliente' })
  Id_Cliente: number;

  @Column({ name: 'Celular', length: 10 })
  Celular: string;

  @ManyToOne(() => Cliente, cliente => cliente.celulares)
  @JoinColumn({ name: 'Id_Cliente' })
  cliente: Cliente;
}