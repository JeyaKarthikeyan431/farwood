import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector,
    private route: ActivatedRoute,
    private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    if (token != '' && token != null) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
      return next.handle(request);
    } else {
      this.router.navigate(['auth/login']);
    }

  }
}
