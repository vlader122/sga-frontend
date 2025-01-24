export class Activo {
    id!: number;
    codigoInventario!: string;
    nombre!: string;
    idcategoria!: number;
    marca!: string;
    modelo!: string;
    serie!: string;
    descripcion!: string;
    estadoAsignacion!: boolean;

    constructor(
        codigoInventario: string = '',
        nombre: string = '',
        idcategoria: number = 0,
        marca: string = '',
        modelo: string = '',
        serie: string = '',
        descripcion: string = '',
        estadoAsignacion: boolean = false,
    ) {
        this.codigoInventario = codigoInventario
        this.nombre = nombre
        this.idcategoria = idcategoria
        this.marca = marca
        this.modelo = modelo
        this.serie = serie
        this.descripcion = descripcion
        this.estadoAsignacion = estadoAsignacion
      }
}
