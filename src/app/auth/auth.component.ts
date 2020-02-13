import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';

interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  registerMode = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  // check if has cookie redirect
  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    if (mrToken) {
      this.router.navigate(['/movies']);
    }
  }

  // function control when submit form
  saveForm() {
    if (!this.registerMode) {
      this.loginUser();
    } else {
      this.registerUser();
    }
  }

  // function login user
  loginUser() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        this.cookieService.set('mr-token', result.token);
        this.router.navigate(['/movies']);
      },
      error => console.error()
    );
  }

  // function register user
  registerUser() {
    this.apiService.registerUser(this.authForm.value).subscribe(
      result => {
        this.loginUser();
      },
      error => console.error()
    );
  }

  // function not allow submit form if lack of username, password
  formDisable() {
    if (this.authForm.value.username.length &&
      this.authForm.value.password.length) {
      return false;
    } else {
      return true;
    }
  }
}
