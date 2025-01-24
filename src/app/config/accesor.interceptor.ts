import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

export const AccesorInterceptorFn: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService); // Inyecta el servicio
  const token = authService.getToken(); // Obtén el token desde AuthService

  if (!request.url.includes('api/v1/auth/login') && token) {
    // Clona la solicitud agregando el encabezado Authorization
    const solicitudConToken = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(solicitudConToken); // Pasa la solicitud clonada al siguiente interceptor o handler
  } else {
    return next(request); // Si no aplica, pasa la solicitud original
  }
};
