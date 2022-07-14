import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  componentMode: string = 'signIn';

  constructor() { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.componentMode = this.componentMode == 'signIn' ? 'signUp' : 'signIn'
  }

}
