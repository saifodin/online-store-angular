import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { Register } from 'src/app/models/register.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
  @ViewChild('signUpForm') signUpForm: NgForm | undefined;
  isLoading: boolean = false;
  errorMessage: string = '';
  formValues: Register = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  navigateToLoginIn() {
    this.router.navigate(['auth/signIn']);
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = ''
    if (this.signUpForm?.valid) {
      this.formValues = {
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      }
      this.signUp();
    }
    else {
      this.isLoading = false;
      this.signUpForm?.form.markAllAsTouched();
    }
  }

  signUp() {
    this.authService.signUp(this.formValues).subscribe({
      next: (value) => {
        console.log("request Signup Success", value);
        this.signIn(this.formValues.email, this.formValues.password);
        this.isLoading = false;
        this.errorMessage = '';
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log("request Signup Error", err);
        this.isLoading = false;
        this.errorMessage = err.error.errorServer;
      },
    })
  }

  signIn(email: string, password: string) {
    var login: Login = {
      userName: email,
      password
    }
    this.authService.signIn(login).subscribe({
      next: (value) => {
        console.log("request Login Success", value)
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log("request Login Error", err)
      },
    })
  }


}
