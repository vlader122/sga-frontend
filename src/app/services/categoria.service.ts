import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
    ruta = `${environment.rutaBackend}/api/v1/categorias`;
    constructor(private httpCliente: HttpClient) { }

    obtenerCategorias(): Observable<any> {
        return this.httpCliente.get<any>(this.ruta);
    }
}
