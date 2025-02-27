import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
    ruta = `${environment.rutaBackend}/api/v1/categorias`;
    constructor(private httpCliente: HttpClient) { }

    obtenerCategorias(size?:number): Observable<any> {
        if(!size){
            size=0
        }
        console.log("servicio",size);
        return this.httpCliente.get<any>(this.ruta + '?size='+size);
    }

    guardarCategoria(categoria: any): Observable<any> {
        return this.httpCliente.post<any>(this.ruta, categoria);
    }

    eliminarCategoria(id: number):Observable<any>{
        return this.httpCliente.delete<any>(this.ruta + '/' + id);
    }

    editarCategoria(categoria: any): Observable<any>{
        return this.httpCliente.put<any>(this.ruta,categoria);
    }
}
