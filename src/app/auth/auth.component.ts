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

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    if (mrToken) {
      this.router.navigate(['/movies']);
    }
  }

  saveForm() {
    if (!this.registerMode) {
      this.loginUser();
    } else {
      this.registerUser();
    }
  }

  loginUser() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        // console.log(result),
        this.cookieService.set('mr-token', result.token);
        this.router.navigate(['/movies']);
      },
      error => console.error()
    );
  }

  registerUser() {
    this.apiService.registerUser(this.authForm.value).subscribe(
      result => {
        this.loginUser();
      },
      error => console.error()
    );
  }
}
