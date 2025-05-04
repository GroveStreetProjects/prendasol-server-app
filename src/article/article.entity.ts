import { Cliente } from 'src/client/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Fotocopia {
  @PrimaryGeneratedColumn()
  Id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.fotocopias)
  @JoinColumn({ name: 'Id_Cliente' })
  cliente: Cliente;

  @Column({ length: 30 })
  Imagen: string;

  @OneToMany(() => Articulo, (articulo) => articulo.fotocopia)
  articulos: Articulo[];
}

@Entity()
export class Articulo {
  @PrimaryGeneratedColumn()
  Id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.articulos)
  @JoinColumn({ name: 'Id_Cliente' })
  cliente: Cliente;

  @Column({ length: 50 })
  Nombre: string;

  @Column({ length: 30 })
  Imagen: string;

  @ManyToOne(() => Fotocopia, (fotocopia) => fotocopia.articulos)
  @JoinColumn({ name: 'Id_Fotocopia' })
  fotocopia: Fotocopia;

  @Column({ type: 'double', precision: 9, scale: 2 })
  Precio_Empeno: number;

  @Column({ type: 'double', precision: 8, scale: 2 })
  Utilidad: number;

  @Column({ type: 'date' })
  Fecha_Ingreso: Date;

  @Column({ type: 'date' })
  Fecha_Limite: Date;

  @Column({ length: 10 })
  Estado_Articulo: string;

  @Column({ type: 'date', nullable: true })
  Fecha_Recogida: Date;

  @Column({ type: 'date', nullable: true })
  Fecha_Venta: Date;
}