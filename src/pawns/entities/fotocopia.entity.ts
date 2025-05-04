import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('fotocopia')
export class Fotocopia {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'Id_Cliente' })
  Id_Cliente: number;

  @Column({ length: 30 })
  Imagen: string;

  @ManyToOne(() => Cliente, cliente => cliente.fotocopias)
  @JoinColumn({ name: 'Id_Cliente' })
  cliente: Cliente;
}