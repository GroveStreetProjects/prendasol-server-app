import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('articulos')
export class Articulo {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'int' })
  Id_Cliente: number;

  @Column({ type: 'int' })
  Id_Empleado: number;

  @Column({ type: 'int' })
  Id_Categoria: number;

  @Column({ type: 'varchar', length: 50 })
  Nombre: string;

  @Column({ type: 'varchar', length: 30 })
  Imagen: string;

  @Column({ type: 'int' })
  Id_Fotocopia: number;

  @Column({ type: 'double', precision: 9, scale: 2 })
  Precio_Empeno: number;

  @Column({ type: 'double', precision: 8, scale: 2 })
  Utilidad: number;

  @Column({ type: 'date' })
  Fecha_Ingreso: Date;

  @Column({ type: 'date' })
  Fecha_Limite: Date;

  @Column({ type: 'varchar', length: 10 })
  Estado_Articulo: string;

  @Column({ type: 'date', nullable: true })
  Fecha_Recogida: Date | null;

  @Column({ type: 'date', nullable: true })
  Fecha_Venta: Date | null;
}