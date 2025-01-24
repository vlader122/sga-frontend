import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    ruta = `${environment.rutaBackend}/api/v1/auth/login`;

    token: string = environment.token;
    constructor(
        private _httpClient: HttpClient
    ) { }

    login(usuario:string, password:string){
        const body = { usuario: usuario, password: password};
        return this._httpClient.post(this.ruta, body,
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')
            }
        );
    }

    logout(){
        sessionStorage.clear();
    }

    getToken(){
        let token = sessionStorage.getItem(this.token);
        if(token === null){
            token = '';
        }
        return token;
    }
}
