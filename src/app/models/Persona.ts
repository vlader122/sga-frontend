export class Persona {
    id!: number;
    nombre!: string;
    apellido!: string;
    email!: string;
    telefono!: string;

    constructor(
            nombre: string = '',
            apellido: string = '',
            email: string = '',
            telefono: string = '',
        ) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.email = email;
            this.telefono = telefono;
      }
}
