import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(take(1), map(user => {
      const isAuth = !!user;
      if (!isAuth)
        return true;
      else if (user?.userType == 'Customer')
        return this.router.createUrlTree(['/home']);

      return this.router.createUrlTree(['/admin']);
    }))
  }
  
}
