import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  customer = new BehaviorSubject<Customer | null>(null);

  constructor(private http: HttpClient) { }

  signUp(register: Register) {
    return this.http.post('https://localhost:7159/api/Customer/Register',
      register,
    )
  }

  signIn(login: Login) {
    return this.http.post<Token>('https://localhost:7159/api/Customer/login',
      login,
    ).pipe(tap(resData => {
      this.getDataFromLoginToCustomer(resData.token, new Date())
    }))
  }

  private getDataFromLoginToCustomer(token: string, expiryDate: Date) {
    const customer = new Customer(
      token,
      expiryDate
    );
    this.customer.next(customer);
    localStorage.setItem("customerToken", customer.token);
  }

}


// return this.http.post<{id:string, resPass:boolean}>(this.urlFirst, bodyObject)
//  .pipe(
//      // concatMap is the preferred operator for typical http operations, see below for more details
//      concatMap(({id:string, resPass:boolean}) => resPass ? 
//                        this.http.get<any>(this.passUrl) : 
//                        otherObservable)
//  );