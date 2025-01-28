import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
    ruta = `${environment.rutaBackend}/api/v1/personas`;
    constructor(private httpCliente: HttpClient) { }

    obtenerPersonas(size?:number): Observable<any> {
        if(!size){
            size=0
        }
        return this.httpCliente.get<any>(this.ruta + '?size='+size);
    }

    guardarPersona(persona: any): Observable<any> {
        return this.httpCliente.post<any>(this.ruta, persona);
    }

    eliminarPersona(id: number):Observable<any>{
        return this.httpCliente.delete<any>(this.ruta + '/' + id);
    }

    editarPersona(persona: any): Observable<any>{
        return this.httpCliente.put<any>(this.ruta,persona);
    }
}
