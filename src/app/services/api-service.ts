import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { ILogin } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'https://be-12092025.onrender.com';
  constructor(private http: HttpClient, public router: Router) {}

  getLogin(prop: ILogin) {
    this.http
      .post(this.API_URL + '/auth/login', prop)
      .pipe(retry(4))
      .subscribe(
        (response) => {
          console.log(Object.values(response));
          // this.router.navigate(['home']);
          this.getUser(Object.values(response)[0], Object.values(response)[2]);
        },
        (error) => {
          console.error('Login failed', error.status);
        }
      );
  }

  getUser(token: string, id: string) {
    this.http
      .get(this.API_URL + '/user/' + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(retry(4))
      .subscribe(
        (response) => {
          console.log(id);
          console.log(response);
        },
        (error) => {
          console.log(id);
          console.error('User not found', error.status);
        }
      );
  }
}
