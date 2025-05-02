import { Articulo, Fotocopia } from 'src/article/article.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => CelularesCliente, (celularCliente) => celularCliente.cliente)
  celulares: CelularesCliente[];

  @OneToMany(() => CorreosCliente, (correoCliente) => correoCliente.cliente)
  correos: CorreosCliente[];

  @OneToMany(() => Articulo, (articulo) => articulo.cliente)
  articulos: Articulo[];

  @OneToMany(() => Fotocopia, (fotocopia) => fotocopia.cliente)
  fotocopias: Fotocopia[];
}

@Entity()
export class CelularesCliente {
  @ManyToOne(() => Cliente, (cliente) => cliente.celulares)
  @JoinColumn({ name: 'Id_Cliente' })
  cliente: Cliente;

  @Column({ length: 10 })
  Celular: string;
}

@Entity()
export class CorreosCliente {
  @ManyToOne(() => Cliente, (cliente) => cliente.correos)
  @JoinColumn({ name: 'Id_Cliente' })
  cliente: Cliente;

  @Column({ length: 50 })
  Correo: string;
}