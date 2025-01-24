import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
    private usuario: string = '';
    private password: string = '';

    token: string = environment.token;

    formulario: FormGroup;
    constructor(
        private _authService:AuthService,
        private _router:Router
    ){
        this.formulario = new FormGroup({
            usuario: new FormControl('',[Validators.required]),
            password: new FormControl('',[Validators.required])
        })
    }
    faceptar(){
        this.usuario = this.formulario.value.usuario;
        this.password = this.formulario.value.password;
        this._authService.login(this.usuario,this.password).subscribe(
            (data) => {
                if(data) {
                    const tokenString = JSON.stringify(data);
                    const token = JSON.parse(tokenString).token;
                    sessionStorage.setItem(this.token, token);
                    this._router.navigateByUrl('/');
                }
            },
            (err) => {
                if(err.status === 0){
                    console.log("error de conexion");
                }
                if(err.status === 400){
                    console.log("Credenciales incorrectos");
                }
            }
        )
    }
}
