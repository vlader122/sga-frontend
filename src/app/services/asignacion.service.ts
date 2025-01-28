import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {
    ruta = `${environment.rutaBackend}/api/v1/asignaciones`;
    constructor(private httpCliente: HttpClient) { }

    obtenerAsignaciones(size?:number): Observable<any> {
        if(!size){
            size=0
        }
        console.log("servicio",size);
        return this.httpCliente.get<any>(this.ruta + '?size='+size);
    }

    guardarAsignacion(asignacion: any): Observable<any> {
        return this.httpCliente.post<any>(this.ruta, asignacion);
    }

    eliminarAsignacion(id: number):Observable<any>{
        return this.httpCliente.delete<any>(this.ruta + '/' + id);
    }

    editarAsignacion(asignacion: any): Observable<any>{
        return this.httpCliente.put<any>(this.ruta,asignacion);
    }
}
