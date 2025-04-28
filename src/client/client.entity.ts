import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 50 })
  Nombres: string;

  @Column({ length: 30 })
  Paterno: string;

  @Column({ length: 30 })
  Materno: string;

  @Column({ length: 12 })
  CI: string;

  @Column({ length: 100 })
  Contrasena: string;
}