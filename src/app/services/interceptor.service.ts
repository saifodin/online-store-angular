import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, Observable, take } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.customer.pipe(take(1), exhaustMap(user => {

      // if(!user)
      //   return next.handle(request);

      const modifiedRequest = request.clone({
          setHeaders: {
            // Authorization: `Bearer ${user.token}`,
            Authorization: `Bearer ${localStorage.getItem("customerToken")}`,
          },
        });

      return next.handle(modifiedRequest);
    }));
  }
}
