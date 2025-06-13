import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('fotocopia')
export class Fotocopia {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'imagen_url', length: 255 })
  ImagenUrl: string;

  @Column({ length: 100, nullable: true })
  Descripcion?: string;

  @ManyToOne(() => Cliente, cliente => cliente.Fotocopias)
  @JoinColumn({ name: 'cliente_id' })
  Cliente: Cliente;
}
