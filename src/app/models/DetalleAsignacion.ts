export class DetalleAsignacion {
    id!: number;
    idactivo!: number;
    idasignacion!: number;
    estado!: boolean;

    constructor(
        idactivo: number = 0,
        estado: boolean = true
    ) {
        this.idactivo = idactivo
        this.estado = estado
      }
}
