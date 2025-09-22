import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { ILogin } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'https://be-12092025.onrender.com/api';
  constructor(private http: HttpClient, public router: Router) {}

  getLogin(prop: ILogin) {
    this.http
      .post(this.API_URL + '/auth/login', prop)
      .pipe(retry(4))
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['home']);
        },
        (error) => {
          console.error('Login failed', error.status);
        }
      );
  }
}
