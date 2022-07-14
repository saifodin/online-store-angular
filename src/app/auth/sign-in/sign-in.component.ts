import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SignInComponent implements OnInit {
  @ViewChild('signInForm') signInForm: NgForm | undefined;
  errorMessage: string = '';
  isLoading: boolean = false
  formValues: Login = {
    userName: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  navigateToSignUP() {
    this.router.navigate(['auth/signUp']);
  }

  onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;
    if (this.signInForm?.valid) {
      this.signIn();
    }
    else {
      this.signInForm?.form.markAllAsTouched();
    }
    this.isLoading = false;
  }

  signIn() {
    this.formValues = {
      userName: this.signInForm?.value.email,
      password: this.signInForm?.value.password
    }
    this.authService.signIn(this.formValues).subscribe({
      next: (value) => {
        this.isLoading = false;
        this.errorMessage = '';
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.errorServer;
      },
    })
  }

}
