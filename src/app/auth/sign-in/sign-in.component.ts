import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
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
  userType = ''
  errorMessage: string = '';
  isLoading: boolean = false
  formValues: Login = {
    userName: '',
    password: ''
  };

  constructor(private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchDataForRouting();
  }

  fetchDataForRouting() {
    this.route.data.subscribe((data: Data) => {
      this.userType = data['userType'];
    })
  }

  navigateToSignUP() {
    this.router.navigate(['auth/signUp']);
  }

  navigateToSignInAsAdmin() {
    this.router.navigate(['auth/signIn/admin']);
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
    if(this.userType == 'customer'){
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
    else if (this.userType == 'admin'){
      this.authService.signInAsAdmin(this.formValues).subscribe({
        next: (value) => {
          this.isLoading = false;
          this.errorMessage = '';
          this.router.navigate(['admin']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.errorServer;
        },
      })
    }
  }

}
