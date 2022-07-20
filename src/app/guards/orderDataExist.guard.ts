import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../services/order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDataExistGuard implements CanActivate {

  constructor(private orderService: OrderService, private router: Router) {
  }

  canActivate( route: ActivatedRouteSnapshot, tate: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.orderService.orderData.phone == '')
      return this.router.createUrlTree(['/home/checkout']);
    return true
  }
  
}
