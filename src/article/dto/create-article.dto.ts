export class CreateArticleDto {
  Id: number;
  Id_Cliente: number;
  Id_Empleado: number;
  Id_Categoria: number;
  Nombre: string;
  Imagen: string;
  Id_Fotocopia: number;
  Precio_Empeno: number;
  Utilidad: number;
  Fecha_Ingreso: Date;
  Fecha_Limite: Date;
  Estado_Articulo: string;
  Fecha_Recogida: Date;
  Fecha_Venta: Date;
}