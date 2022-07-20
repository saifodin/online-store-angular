import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, Observable, take } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      if (!user) {
        return next.handle(request);
      }

      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      return next.handle(modifiedRequest);
    }));
  }
}
