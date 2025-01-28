export class Asignacion {
    id!: number;
    fechaAsignacion!: Date;
    idusuario!: number;
    idpersona!: number;
    observacion!: string;

    constructor(
        fechaAsignacion: Date = new Date,
        idusuario: number = 0,
        idpersona: number = 0,
        observacion: string = ''
    ) {
        this.fechaAsignacion = fechaAsignacion
        this.idusuario = idusuario
        this.idpersona = idpersona
        this.observacion = observacion
      }
}
