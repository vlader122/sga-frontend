import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {
    ruta = `${environment.rutaBackend}/api/v1/activos`;
    constructor(private httpCliente: HttpClient) { }

    obtenerActivos(size?:number): Observable<any> {
        if(!size){
            size=0
        }
        console.log("servicio",size);
        return this.httpCliente.get<any>(this.ruta + '?size='+size);
    }

    guardarActivo(activo: any): Observable<any> {
        return this.httpCliente.post<any>(this.ruta, activo);
    }

    eliminarActivo(id: number):Observable<any>{
        return this.httpCliente.delete<any>(this.ruta + '/' + id);
    }

    editarActivo(activo: any): Observable<any>{
        return this.httpCliente.put<any>(this.ruta,activo);
    }
}
