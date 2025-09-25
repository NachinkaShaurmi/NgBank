import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs';
import { ILogin, IUser } from '../interfaces/interfaces';
import { Storage } from './storage';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'https://be-12092025.onrender.com';
  private http: HttpClient = inject(HttpClient);
  public storage: Storage = inject(Storage);

  getLogin(prop: ILogin) {
    this.http
      .post(this.API_URL + '/auth/login', prop)
      .pipe(retry(4))
      .subscribe(
        (response) => {
          this.storage.setToken(Object.values(response));
          this.getUser(Object.values(response)[2]);
        },
        (error) => {
          console.error('Login failed', error.status);
        }
      );
  }

  getUser(id: string) {
    this.http
      .get<IUser[]>(this.API_URL + '/user/' + id, {
        headers: { Authorization: `Bearer ${this.storage.token}` },
      })
      .pipe(retry(4))
      .subscribe(
        (response) => {
          const data = response;
          this.storage.getData(data);
        },
        (error) => {
          console.error('User not found', error.status);
        }
      );
  }
}
