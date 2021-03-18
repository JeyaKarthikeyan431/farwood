

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(public router: Router, private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    return next
      .handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.hide();
          }
        }, (error) => {
          this.spinnerService.hide();
          this.handleError(error);
        })
      );
  }
  handleError(error) {
    if (error.status === 401) {
      this.router.navigate(['auth/login']);
      const errorRes = error.error.message || error.statusText;
      return throwError(errorRes);
    }
    if (error.status === 500) {
      const errorRes = error.error.message || error.statusText;
      return throwError(errorRes);
    }
  }
}