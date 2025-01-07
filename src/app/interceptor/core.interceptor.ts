import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class CoreInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          console.error('Inside interceptor:', error);
          if (error.status === HttpStatusCode.Unauthorized) {
            throw new HttpErrorResponse({
              status: HttpStatusCode.Unauthorized,
              statusText: 'Unauthorized request',
            });
          } else {
            throw new HttpErrorResponse({
              status: HttpStatusCode.InternalServerError,
              statusText: 'Internal server error', 
            });
          }
        }
        return of(error as HttpEvent<unknown>);
      }),
    );
  }
}
