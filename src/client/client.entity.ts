import { Articulo, Fotocopia } from 'src/article/article.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

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

  @OneToMany(() => Celulares_Cliente, (celularCliente) => celularCliente.cliente)
  celulares: Celulares_Cliente[];

  @OneToMany(() => Correos_Cliente, (correoCliente) => correoCliente.cliente)
  correos: Correos_Cliente[];

  @OneToMany(() => Articulo, (articulo) => articulo.cliente)
  articulos: Articulo[];

  @OneToMany(() => Fotocopia, (fotocopia) => fotocopia.cliente)
  fotocopias: Fotocopia[];
}

@Entity()
export class Celulares_Cliente {
  @PrimaryColumn()
  @ManyToOne(() => Cliente, (cliente) => cliente.celulares)
  @JoinColumn({ name: 'Id_Cliente' })
  cliente: number;

  @Column({ length: 10 })
  Celular: string;
}

@Entity()
export class Correos_Cliente {
  @PrimaryColumn()
  @ManyToOne(() => Cliente, (cliente) => cliente.correos)
  @JoinColumn({ name: 'Id_Cliente' })
  cliente: number;

  @Column({ length: 50 })
  Correo: string;
}