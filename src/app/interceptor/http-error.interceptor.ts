

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  tokenExpired: boolean = false;
  showError: boolean = false;

  constructor(public router: Router,) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.tokenExpired = true;
          this.router.navigate(['auth/login']);
          if (!this.showError) {
            this.showError = true;
          }
        }
        if (err.status === 500) {
          const error = err.error.message || err.statusText;
          return throwError(error);
        }
        if (!this.tokenExpired) {
          const error = err.error.message || err.statusText;
          return throwError(error);
        } else {
        }
      })
    );
  }
}