import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  auth: AuthService = inject(AuthService);

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.lastToken;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` 
        }
      });
    }
    
    return next.handle(request);
  }
}
