import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Outgoing HTTP request');
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        console.log('Incoming HTTP requests', event);
      })
    )
  }
}
