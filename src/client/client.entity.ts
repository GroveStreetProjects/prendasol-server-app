import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 50 })
  Nombres: string;

  @Column({ type: 'varchar', length: 30 })
  Paterno: string;

  @Column({ type: 'varchar', length: 30 })
  Materno: string;

  @Column({ type: 'varchar', length: 12, unique: true })
  CI: string;

  @Column({ type: 'varchar', length: 100 })
  Contrasena: string;
}