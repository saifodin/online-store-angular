import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { CustomerDataService } from '../services/customer-data.service';

@Injectable({
  providedIn: 'root'
})
export class AllInCartAvailableGuard implements CanActivate {

  constructor(private customerDataService: CustomerDataService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log("AllInCartAvailableGuard")
    return this.customerDataService.checkProductsAvailability().pipe(take(1), map(value => {
      if (value.length == 0)
        return true;
      return this.router.createUrlTree(['/home/products']);
    }))
  }

}
