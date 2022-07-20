import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { Token } from '../models/token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User | null>(null);
  private tokenExpireTimeOut: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(register: Register) {
    return this.http.post('https://localhost:7159/api/Customer/Register',
      register,
    )
  }

  signIn(login: Login) {
    return this.http.post<Token>('https://localhost:7159/api/Customer/login',
      login,
    ).pipe(tap(resData => {
      this.getDataFromLoginToUser(resData.token, new Date(resData.expiryDate), resData.userType)
    }))
  }

  signInAsAdmin(login: Login) {
    console.log("signInAsAdmin")
    return this.http.post<Token>('https://localhost:7159/api/admin/login',
      login,
    ).pipe(tap(resData => {
      // console.log(resData);
      this.getDataFromLoginToUser(resData.token, new Date(resData.expiryDate), resData.userType);
    }))
  }

  private getDataFromLoginToUser(token: string, expiryDate: Date, userType: string) {
    console.log("getDataFromLoginToUser")
    const user = new User(
      token,
      expiryDate,
      userType,
    );
    const expirationDuration = new Date(expiryDate).getTime() - new Date().getTime();
    this.user.next(user);
    localStorage.setItem("userToken", JSON.stringify(user));
    this.autoLogout(expirationDuration);
  }

  autoLogin() {
    console.log("autoLogin")
    const userString = localStorage.getItem('userToken');
    // console.log(userString)
    if (!userString)
      return;

    const userObj = JSON.parse(userString);
    // console.log("autoLogin userObjFromLS", userObj)
    if (userObj.token !== ''){
      this.getDataFromLoginToUser(userObj.token, new Date(userObj.tokenExpirationDate), userObj.userType)
    }
  }

  autoLogout(expirationDuration: number) {
    console.log("autoLogout start count")
    this.tokenExpireTimeOut = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  logout() {
    console.log("logout")
    this.user.next(null);
    localStorage.removeItem('userToken');
    this.router.navigate([''])
    if (this.tokenExpireTimeOut)
      clearTimeout(this.tokenExpireTimeOut);
  }

}