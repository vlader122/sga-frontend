export class Categoria {
    id!: number;
    descripcion: string;


    constructor(descripcion: string = '') {

        this.descripcion = descripcion;
      }
}
