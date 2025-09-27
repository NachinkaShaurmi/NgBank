import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { ILogin } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'https://be-12092025.onrender.com';
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  getLogin(prop: ILogin) {
    this.http
      .post(this.API_URL + '/auth/login', prop)
      .pipe(retry(4))
      .subscribe({
        next: (response) => {
          localStorage.setItem("response", JSON.stringify(response))
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.error('Login failed', error.status);
        },
      });
  }
}
