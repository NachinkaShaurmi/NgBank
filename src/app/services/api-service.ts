import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { retry } from 'rxjs';
import { ILogin } from '../interfaces/interfaces';
import { Storage } from './storage';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'https://be-12092025.onrender.com';
  constructor(
    private http: HttpClient,
    public storage: Storage = inject(Storage)
  ) {}

  getLogin(prop: ILogin) {
    this.http
      .post(this.API_URL + '/auth/login', prop)
      .pipe(retry(4))
      .subscribe(
        (response) => {
          // console.log(Object.values(response));
          this.storage.setToken(Object.values(response)[0]);
          this.getUser(Object.values(response)[2]);
        },
        (error) => {
          console.error('Login failed', error.status);
        }
      );
  }

  getUser(id: string) {
    this.http
      .get(this.API_URL + '/user/' + id, {
        headers: { Authorization: `Bearer ${this.storage.token}` },
      })
      .pipe(retry(4))
      .subscribe(
        (response) => {
          console.log(response);
          this.storage.getData(Object.values(response))
        },
        (error) => {
          console.error('User not found', error.status);
        }
      );
  }
}
