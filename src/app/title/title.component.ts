import { Component } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  nombre:string = 'Niver';
  personas:string[] = ['Luis','Raul','Pepe'];
  numero1:number = 5;
  numero2:number = 8;

  cambiarNombre() {
    this.nombre = "COquito";
    console.log(this.nombre);
  }
}
