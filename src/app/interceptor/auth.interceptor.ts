import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(/* authService: AuthService */) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = "";

    if (authToken) {
      // clone request and attach token
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
