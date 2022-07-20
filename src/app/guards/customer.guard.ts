import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(take(1), map(user => {
      const isAuth = !!user;
      console.log("isAuth", isAuth);
      console.log(user?.userType);
      if (isAuth && user.userType == "Customer")
        return true;
      else if (user?.userType == 'Admin')
        return this.router.createUrlTree(['/admin']);
      return this.router.createUrlTree(['/auth']);
    }))
  }
  
}
